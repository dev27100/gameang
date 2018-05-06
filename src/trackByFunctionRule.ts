import { BoundDirectivePropertyAst } from '@angular/compiler';
import { IRuleMetadata, RuleFailure, Rules } from 'tslint/lib';
import { SourceFile } from 'typescript/lib/typescript';
import { NgWalker } from './angular/ngWalker';
import { BasicTemplateAstVisitor } from './angular/templates/basicTemplateAstVisitor';

export class Rule extends Rules.AbstractRule {
  static readonly metadata: IRuleMetadata = {
    description: 'Ensures a trackBy function is used.',
    options: null,
    optionsDescription: 'Not configurable.',
    rationale: "The use of 'trackBy' is considered a good practice.",
    ruleName: 'trackBy-function',
    type: 'functionality',
    typescriptOnly: true
  };

  static readonly FAILURE_STRING = 'Missing trackBy function in ngFor directive';

  apply(sourceFile: SourceFile): RuleFailure[] {
    return this.applyWithWalker(new NgWalker(sourceFile, this.getOptions(), { templateVisitorCtrl: TrackByTemplateVisitor }));
  }
}

export const getFailureMessage = (): string => {
  return Rule.FAILURE_STRING;
};

class TrackByFunctionTemplateVisitor extends BasicTemplateAstVisitor {
  visitDirectiveProperty(prop: BoundDirectivePropertyAst, context: any): any {
    this.validateDirective(prop, context);
    super.visitDirectiveProperty(prop, context);
  }

  private validateDirective(prop: BoundDirectivePropertyAst, context: any): any {
    const { templateName } = prop;

    if (templateName !== 'ngForOf') {
      return;
    }

    const pattern = /trackBy\s*:|\[ngForTrackBy\]\s*=\s*['"].*['"]/;

    if (pattern.test(context.codeWithMap.source)) {
      return;
    }

    const {
      sourceSpan: {
        end: { offset: endOffset },
        start: { offset: startOffset }
      }
    } = prop;
    context.addFailureFromStartToEnd(startOffset, endOffset, getFailureMessage());
  }
}

class TrackByTemplateVisitor extends BasicTemplateAstVisitor {
  private readonly visitors: ReadonlySet<BasicTemplateAstVisitor> = new Set([
    new TrackByFunctionTemplateVisitor(this.getSourceFile(), this.getOptions(), this.context, this.templateStart)
  ]);

  visitDirectiveProperty(prop: BoundDirectivePropertyAst, context: any): any {
    this.visitors.forEach(visitor => visitor.visitDirectiveProperty(prop, this));

    super.visitDirectiveProperty(prop, context);
  }
}
