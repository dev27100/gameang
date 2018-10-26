import { sprintf } from 'sprintf-js';
import { IOptions, IRuleMetadata, RuleFailure, Rules, Utils } from 'tslint/lib';
import { SourceFile } from 'typescript/lib/typescript';
import { CodeWithSourceMap, ComponentMetadata } from './angular/metadata';
import { NgWalker } from './angular/ngWalker';

const DEFAULT_STYLES_LIMIT: number = 3;
const DEFAULT_TEMPLATE_LIMIT: number = 3;
const OPTION_STYLES = 'styles';
const OPTION_TEMPLATE = 'template';

export class Rule extends Rules.AbstractRule {
  static readonly metadata: IRuleMetadata = {
    description: 'Disallows having too many lines in inline template and styles. Forces separate template or styles file creation.',
    descriptionDetails: 'See more at https://angular.io/guide/styleguide#style-05-04.',
    optionExamples: [true, [true, { [OPTION_STYLES]: 8, [OPTION_TEMPLATE]: 5 }]],
    options: {
      items: {
        properties: {
          [OPTION_STYLES]: {
            type: 'number'
          },
          [OPTION_TEMPLATE]: {
            type: 'number'
          }
        },
        type: 'object'
      },
      maxLength: 1,
      minLength: 0,
      type: 'array'
    },
    optionsDescription: Utils.dedent`
      It can take an optional object with the properties '${OPTION_STYLES}' and '${OPTION_TEMPLATE}':
      * \`${OPTION_STYLES}\` - number > 0 defining the maximum allowed inline lines for styles. Defaults to ${DEFAULT_STYLES_LIMIT}.
      * \`${OPTION_TEMPLATE}\` - number > 0 defining the maximum allowed inline lines for template. Defaults to ${DEFAULT_TEMPLATE_LIMIT}.
    `,
    rationale:
      "Large, inline templates and styles obscure the component's purpose and implementation, reducing readability and maintainability.",
    ruleName: 'max-inline-declarations',
    type: 'maintainability',
    typescriptOnly: true
  };

  static readonly FAILURE_STRING = 'Exceeds the maximum allowed inline lines for %s. Defined limit: %s / total lines: %s (https://angular.io/guide/styleguide#style-05-04)';

  apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new MaxInlineDeclarationsValidator(sourceFile, this.getOptions()));
  }
}

type PropertyType = 'styles' | 'template';

export type PropertyPair = { [key in PropertyType]?: number };

const generateFailure = (type: PropertyType, limit: number, value: number): string => {
  return sprintf(Rule.FAILURE_STRING, type, limit, value);
};

export const getStylesFailure = (value: number, limit = DEFAULT_STYLES_LIMIT): string => {
  return generateFailure(OPTION_STYLES, limit, value);
};

export const getTemplateFailure = (value: number, limit = DEFAULT_TEMPLATE_LIMIT): string => {
  return generateFailure(OPTION_TEMPLATE, limit, value);
};

export class MaxInlineDeclarationsValidator extends NgWalker {
  private readonly stylesLinesLimit = DEFAULT_STYLES_LIMIT;
  private readonly templateLinesLimit = DEFAULT_TEMPLATE_LIMIT;
  private readonly newLineRegExp = /\r\n|\r|\n/;

  constructor(sourceFile: SourceFile, options: IOptions) {
    super(sourceFile, options);

    const { styles, template } = (options.ruleArguments[0] || []) as PropertyPair;

    this.stylesLinesLimit = styles > -1 ? styles : this.stylesLinesLimit;
    this.templateLinesLimit = template > -1 ? template : this.templateLinesLimit;
  }

  protected visitNgComponent(metadata: ComponentMetadata): void {
    this.validateInlineTemplate(metadata);
    this.validateInlineStyles(metadata);
    super.visitNgComponent(metadata);
  }

  private getTotalLines(source: CodeWithSourceMap['source']): number {
    return source.trim().split(this.newLineRegExp).length;
  }

  private getTemplateLinesCount(metadata: ComponentMetadata): number {
    return this.hasInlineTemplate(metadata) ? this.getTotalLines(metadata.template.template.source) : 0;
  }

  private hasInlineTemplate(metadata: ComponentMetadata): boolean {
    return !!(metadata.template && !metadata.template.url && metadata.template.template && metadata.template.template.source);
  }

  private validateInlineTemplate(metadata: ComponentMetadata): void {
    const templateLinesCount = this.getTemplateLinesCount(metadata);

    if (templateLinesCount <= this.templateLinesLimit) {
      return;
    }

    const failureMessage = getTemplateFailure(templateLinesCount, this.templateLinesLimit);

    this.addFailureAtNode(metadata.template.node, failureMessage);
  }

  private getInlineStylesLinesCount(metadata: ComponentMetadata): number {
    let result = 0;

    if (!this.hasInlineStyles(metadata)) {
      return result;
    }

    for (let i = 0; i < metadata.styles.length; i++) {
      if (!metadata.styles[i].url) {
        result += this.getTotalLines(metadata.styles[i].style.source);
      }
    }

    return result;
  }

  private hasInlineStyles(metadata: ComponentMetadata): boolean {
    if (!metadata.styles) {
      return false;
    }

    for (let i = 0; i < metadata.styles.length; i++) {
      const style = metadata.styles[i];

      if (!style.url && style.style && style.style.source) {
        return true;
      }
    }

    return false;
  }

  private validateInlineStyles(metadata: ComponentMetadata): void {
    const stylesLinesCount = this.getInlineStylesLinesCount(metadata);

    if (stylesLinesCount <= this.stylesLinesLimit) {
      return;
    }

    const failureMessage = getStylesFailure(stylesLinesCount, this.stylesLinesLimit);

    for (let i = 0; i < metadata.styles.length; i++) {
      this.addFailureAtNode(metadata.styles[i].node, failureMessage);
    }
  }
}
