import * as ts from 'typescript';
import {
  callExpression,
  decoratorArgument,
  getStringInitializerFromProperty,
  hasProperties,
  isSimpleTemplateString,
  withIdentifier
} from '../util/astQuery';
import { ifTrue, listToMaybe, Maybe, unwrapFirst } from '../util/function';
import { logger } from '../util/logger';
import { getInlineStyle, getTemplate } from '../util/ngQuery';
import { maybeNodeArray } from '../util/utils';
import { Config } from './config';
import { FileResolver } from './fileResolver/fileResolver';
import { CodeWithSourceMap, ComponentMetadata, DirectiveMetadata, StyleMetadata, TemplateMetadata } from './metadata';
import { AbstractResolver, MetadataUrls } from './urlResolvers/abstractResolver';
import { PathResolver } from './urlResolvers/pathResolver';
import { UrlResolver } from './urlResolvers/urlResolver';

const normalizeTransformed = (t: CodeWithSourceMap) => {
  if (!t.map) {
    t.source = t.code;
  }
  return t;
};

/**
 * For async implementation https://gist.github.com/mgechev/6f2245c0dfb38539cc606ea9211ecb37
 */
export class MetadataReader {
  constructor(private _fileResolver: FileResolver, private _urlResolver?: AbstractResolver) {
    this._urlResolver = this._urlResolver || new UrlResolver(new PathResolver());
  }

  read(d: ts.ClassDeclaration): DirectiveMetadata | undefined {
    const componentMetadata = unwrapFirst<ComponentMetadata | undefined>(
      maybeNodeArray(d.decorators!).map(dec => {
        return Maybe.lift(dec)
          .bind(callExpression)
          .bind(withIdentifier('Component') as any)
          .fmap(() => this.readComponentMetadata(d, dec));
      })
    );

    const directiveMetadata = unwrapFirst<DirectiveMetadata | undefined>(
      maybeNodeArray(d.decorators!).map(dec =>
        Maybe.lift(dec)
          .bind(callExpression)
          .bind(withIdentifier('Directive') as any)
          .fmap(() => this.readDirectiveMetadata(d, dec))
      )
    );

    return directiveMetadata || componentMetadata || undefined;
  }

  protected readDirectiveMetadata(d: ts.ClassDeclaration, dec: ts.Decorator): DirectiveMetadata {
    const selector = this.getDecoratorArgument(dec)
      .bind(expr => getStringInitializerFromProperty('selector', expr!.properties))
      .fmap(initializer => initializer!.text);

    return Object.assign(new DirectiveMetadata(), {
      controller: d,
      decorator: dec,
      selector: selector.unwrap()
    });
  }

  protected readComponentMetadata(d: ts.ClassDeclaration, dec: ts.Decorator): ComponentMetadata {
    const expr = this.getDecoratorArgument(dec);
    const directiveMetadata = this.readDirectiveMetadata(d, dec);
    const external_M = expr.fmap(() => this._urlResolver!.resolve(dec));
    const style_M = external_M.bind(external => this.readComponentStylesMetadata(dec, external!));
    const template_M = external_M.bind(external => this.readComponentTemplateMetadata(dec, external!));

    return Object.assign(new ComponentMetadata(), directiveMetadata, {
      styles: style_M.unwrap(),
      template: template_M.unwrap()
    });
  }

  protected getDecoratorArgument(decorator: ts.Decorator): Maybe<ts.ObjectLiteralExpression | undefined> {
    return decoratorArgument(decorator).bind(ifTrue(hasProperties));
  }

  protected readComponentTemplateMetadata(dec: ts.Decorator, external: MetadataUrls): Maybe<TemplateMetadata | undefined> {
    // Resolve Inline template
    return getTemplate(dec)
      .fmap<TemplateMetadata>(inlineTemplate => ({
        node: inlineTemplate,
        template: normalizeTransformed(Config.transformTemplate(inlineTemplate!.text)),
        url: undefined
      }))
      .catch(() =>
        // If there's no valid inline template, we resolve external template
        Maybe.lift(external.templateUrl).bind(url =>
          this._resolve(url!).fmap<TemplateMetadata>(template => ({
            node: undefined,
            template: normalizeTransformed(Config.transformTemplate(template!, url)),
            url
          }))
        )
      );
  }

  protected readComponentStylesMetadata(dec: ts.Decorator, external: MetadataUrls): Maybe<(StyleMetadata | undefined)[] | undefined> {
    return getInlineStyle(dec)
      .fmap(inlineStyles =>
        // Resolve Inline styles
        inlineStyles!.elements.filter(inlineStyle => isSimpleTemplateString(inlineStyle)).map<StyleMetadata>(inlineStyle => ({
          node: inlineStyle as ts.Node,
          style: normalizeTransformed(Config.transformStyle((inlineStyle as ts.StringLiteral | ts.NoSubstitutionTemplateLiteral).text))
        }))
      )
      .catch(() =>
        // If there's no valid inline styles, we resolve external styles
        Maybe.lift(external.styleUrls)
          .fmap(urls =>
            urls.map((
              url // Resolve each style URL and transform to metadata
            ) =>
              this._resolve(url).fmap<StyleMetadata>(style => ({
                node: undefined,
                style: normalizeTransformed(Config.transformStyle(style!)),
                url
              }))
            )
          )
          // merge Maybe<StyleMetadata>[] to Maybe<StyleMetadata[]>
          .bind(url => listToMaybe(url as any) as any)
      );
  }

  private _resolve(url: string): Maybe<string | undefined> {
    try {
      return Maybe.lift(this._fileResolver.resolve(url));
    } catch (e) {
      logger.info('Cannot read file' + url);
      return Maybe.nothing;
    }
  }
}
