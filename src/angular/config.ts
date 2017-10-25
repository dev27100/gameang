import * as ts from 'typescript';
import { CodeWithSourceMap } from './metadata';

export interface UrlResolver {
  (url: string, d: ts.Decorator): string;
}

export interface TemplateTransformer {
  (template: string, url: string, d: ts.Decorator): CodeWithSourceMap;
}

export interface StyleTransformer {
  (style: string, url: string, d: ts.Decorator): CodeWithSourceMap;
}

export const LogLevel = {
  None: 0,
  Error: 0b001,
  Info: 0b011,
  Debug: 0b111
};

export interface Config {
  interpolation: [string, string];
  resolveUrl: UrlResolver;
  transformTemplate: TemplateTransformer;
  transformStyle: StyleTransformer;
  predefinedDirectives: DirectiveDeclaration[];
  logLevel: number;
}

export interface DirectiveDeclaration {
  selector: string;
  exportAs?: string;
  inputs?: string[];
  outputs?: string[];
  hostProperties?: string[];
  hostAttributes?: string[];
  hostListeners?: string[];
}

let BUILD_TYPE = '<%= BUILD_TYPE %>';

export const Config: Config = {
  interpolation: ['{{', '}}'],

  resolveUrl(url: string, d: ts.Decorator) {
    return url;
  },

  transformTemplate(code: string, url: string, d: ts.Decorator) {
    if (!url || url.endsWith('.html')) {
      return { code, url };
    }
    return { code: '', url };
  },

  transformStyle(code: string, url: string, d: ts.Decorator) {
    if (!url || url.endsWith('.css')) {
      return { code, url };
    }
    return { code: '', url };
  },

  predefinedDirectives: [
    { selector: 'form:not([ngNoForm]):not([formGroup]), ngForm, [ngForm]', exportAs: 'ngForm' },
    { selector: '[routerLinkActive]', exportAs: 'routerLinkActive' },
    { selector: '[ngModel]:not([formControlName]):not([formControl])', exportAs: 'ngModel' },
    { selector: '[ngIf]', exportAs: 'ngIf', inputs: ['ngIf'] },
    { selector: '[ngFor][ngForOf]', exportAs: 'ngFor', inputs: ['ngForTemplate', 'ngForOf'] },
    { selector: '[ngSwitch]', exportAs: 'ngSwitch', inputs: ['ngSwitch'] },

    // @angular/material
    { selector: 'mat-autocomplete', exportAs: 'matAutocomplete' },
    { selector: '[mat-menu-item]', exportAs: 'matMenuItem' },
    { selector: 'mat-menu', exportAs: 'matMenu' },
    { selector: 'mat-button-toggle-group:not([multiple])', exportAs: 'matButtonToggleGroup' },
    { selector: '[mat-menu-trigger-for], [matMenuTriggerFor]', exportAs: 'matMenuTrigger' },
    { selector: '[mat-tooltip], [matTooltip]', exportAs: 'matTooltip' },
    { selector: 'mat-select', exportAs: 'matSelect' },
    // The `md-` prefix is deprecated since beta.11, removed since beta.12
    { selector: '[md-menu-item]', exportAs: 'mdMenuItem' },
    { selector: 'md-menu', exportAs: 'mdMenu' },
    { selector: 'md-button-toggle-group:not([multiple])', exportAs: 'mdButtonToggleGroup' },
    { selector: '[md-menu-trigger-for], [mdMenuTriggerFor]', exportAs: 'mdMenuTrigger' },
    { selector: '[md-tooltip], [mdTooltip]', exportAs: 'mdTooltip' },
    { selector: 'md-select', exportAs: 'mdSelect' }
  ],

  logLevel: BUILD_TYPE === 'dev' ? LogLevel.Debug : LogLevel.None
};


try {
  const root = require('app-root-path');
  const newConfig = require(root.path + '/.codelyzer');
  Object.assign(Config, newConfig);
} catch (e) {}

