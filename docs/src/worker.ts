import {WebLinter} from './worker/web-linter';
// import * as rules from 'codelyzer';
const rules = require('codelyzer');

const rulesConfig = {
  'directive-selector': [true, 'attribute', 'sg', 'camelCase'],
  'component-selector': [true, 'element', 'sg', 'kebab-case'],
  'use-input-property-decorator': true,
  'use-output-property-decorator': true,
  'use-host-property-decorator': true,
  'no-input-rename': true,
  'no-output-rename': true,
  'no-on-prefix-output-name': true,
  'use-life-cycle-interface': true,
  'use-pipe-transform-interface': true,
  'component-class-suffix': true,
  'directive-class-suffix': true,
  'import-destructuring-spacing': true,
  'templates-use-public': true,
  'no-access-missing-member': true,
  'invoke-injectable': true,
  'no-unused-css': true
};

const ruleToClass = (ruleName: string) => {
  const result = ruleName.replace(/(\-\w)/g, m => m[1].toUpperCase()) + 'Rule';
  return result[0].toUpperCase() + result.slice(1, result.length);
};

const getRules = (config: any) => {
  return Object.keys(config).map(k => {
    const className = ruleToClass(k);
    const ruleConfig = config[k];
    return new (<any>rules)[className](k, ruleConfig, []);
  });
};

const linter = new WebLinter();

self.addEventListener('message', (e: any) => {
  const config = JSON.parse(e.data);
  let output: any = null;
  let error: any = null;
  try {
    linter.lint('file.ts', config.program, getRules(rulesConfig));
    output = linter.getResult().output;
  } catch (e) {
    error = e;
  }
  if (error) {
    (self as any).postMessage({ error });
  } else {
    (self as any).postMessage({ output });
  }
  linter.reset();
});

