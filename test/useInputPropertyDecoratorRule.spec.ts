import {assertFailure, assertSuccess} from './testHelper';

describe('use-input-property-decorator', () => {
  it('should fail when "inputs" is used in @Component', () => {
    let source = `
      @Component({
        inputs: [
          'id: foo'
        ]
      })
      class Bar {}
    `;
    assertFailure('use-input-property-decorator', source, {
      message: 'Use the @Input property decorator instead of the inputs property ($$05-12$$)',
      startPosition: {
        line: 2,
        character: 8
      },
      endPosition: {
        line: 4,
        character: 9
      }
    });
  });
  it('should succeed when "inputs" is not used', () => {
    let source = `
      @Component({
        selector: 'baz'
      })
      class Bar {}
    `;
    assertSuccess('use-input-property-decorator', source);
  });
  it('should fail when "inputs" is used in @Directive', () => {
    let source = `
      @Directive({
        inputs: [
          'id: foo'
        ]
      })
      class Baz {}
    `;
    assertFailure('use-input-property-decorator', source, {
      message: 'Use the @Input property decorator instead of the inputs property ($$05-12$$)',
      startPosition: {
        line: 2,
        character: 8
      },
      endPosition: {
        line: 4,
        character: 9
      }
    });
  });
});
