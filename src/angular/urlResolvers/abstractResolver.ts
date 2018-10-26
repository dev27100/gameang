import * as ts from 'typescript';
import { getDecoratorArgument, isSimpleTemplateString } from '../../util/utils';

export interface MetadataUrls {
  templateUrl: string;
  styleUrls: string[];
}

export abstract class AbstractResolver {
  abstract resolve(decorator: ts.Decorator): MetadataUrls | null;

  protected getTemplateUrl(decorator: ts.Decorator): string | undefined {
    const arg = getDecoratorArgument(decorator);

    if (!arg) {
      return undefined;
    }

    const prop = arg.properties.find(
      p => (p.name as ts.StringLiteralLike).text === 'templateUrl' && isSimpleTemplateString((p as ts.PropertyAssignment).initializer)
    );

    // We know that it's has an initializer because it's either
    // a template string or a string literal.
    return prop ? ((prop as ts.PropertyAssignment).initializer as ts.StringLiteralLike).text : undefined;
  }

  protected getStyleUrls(decorator: ts.Decorator): string[] {
    const arg = getDecoratorArgument(decorator);

    if (!arg) {
      return [];
    }

    const prop = arg.properties.find(
      p => (p.name as any).text === 'styleUrls' && ts.isPropertyAssignment(p) && ts.isArrayLiteralExpression(p.initializer)
    );

    if (prop) {
      return ((prop as ts.PropertyAssignment).initializer as ts.ArrayLiteralExpression).elements
        .filter(isSimpleTemplateString)
        .map(e => (e as ts.StringLiteralLike).text);
    }

    return [];
  }
}
