import { assertSuccess, assertAnnotated } from './testHelper';

describe('no-on-prefix-output-name', () => {
  describe('invalid directive output property', () => {
    it(`should fail, when a directive output property is named with on prefix`, () => {
      let source = `
      class ButtonComponent {
        @Output() onChange = new EventEmitter<any>();
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }`;
      assertAnnotated({
        ruleName: 'no-on-prefix-output-name',
        source
      });
    });
  });

  describe('valid directive output property', () => {
    it('should succeed, when a directive output property is properly named', () => {
      let source = `
      class ButtonComponent {
         @Output() change = new EventEmitter<any>();
      }`;
      assertSuccess('no-on-prefix-output-name', source);
    });
  });
});
