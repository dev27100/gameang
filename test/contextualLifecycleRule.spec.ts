import { getFailureMessage, Rule } from '../src/contextualLifecycleRule';
import { LifecycleMethods, MetadataTypes } from '../src/util/utils';
import { assertAnnotated, assertSuccess } from './testHelper';

const {
  metadata: { ruleName }
} = Rule;

describe(ruleName, () => {
  describe('failure', () => {
    describe('Injectable', () => {
      it('should fail if ngAfterContentChecked() method is present', () => {
        const source = `
          @Injectable()
          class Test {
            ngAfterContentChecked() { console.log('AfterContentChecked'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Injectable,
          methodName: LifecycleMethods.ngAfterContentChecked
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngAfterContentInit() method is present', () => {
        const source = `
          @Injectable()
          class Test {
            ngAfterContentInit() { console.log('AfterContentInit'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Injectable,
          methodName: LifecycleMethods.ngAfterContentInit
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngAfterViewChecked() method is present', () => {
        const source = `
          @Injectable()
          class Test {
            ngAfterViewChecked() { console.log('AfterViewChecked'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Injectable,
          methodName: LifecycleMethods.ngAfterViewChecked
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngAfterViewInit() method is present', () => {
        const source = `
          @Injectable()
          class Test {
            ngAfterViewInit() { console.log('AfterViewInit'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Injectable,
          methodName: LifecycleMethods.ngAfterViewInit
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngDoCheck() method is present', () => {
        const source = `
          @Injectable()
          class Test {
            ngDoCheck() { console.log('DoCheck'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Injectable,
          methodName: LifecycleMethods.ngDoCheck
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngOnChanges() method is present', () => {
        const source = `
          @Injectable()
          class Test {
            ngOnChanges() { console.log('OnChanges'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Injectable,
          methodName: LifecycleMethods.ngOnChanges
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngOnInit() method is present', () => {
        const source = `
          @Injectable()
          class Test {
            ngOnInit() { console.log('OnInit'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Injectable,
          methodName: LifecycleMethods.ngOnInit
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });
    });

    describe('NgModule', () => {
      it('should fail if ngAfterContentChecked() method is present', () => {
        const source = `
          @NgModule()
          class Test {
            ngAfterContentChecked() { console.log('AfterContentChecked'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.NgModule,
          methodName: LifecycleMethods.ngAfterContentChecked
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngAfterContentInit() method is present', () => {
        const source = `
          @NgModule()
          class Test {
            ngAfterContentInit() { console.log('AfterContentInit'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.NgModule,
          methodName: LifecycleMethods.ngAfterContentInit
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngAfterViewChecked() method is present', () => {
        const source = `
          @NgModule()
          class Test {
            ngAfterViewChecked() { console.log('AfterViewChecked'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.NgModule,
          methodName: LifecycleMethods.ngAfterViewChecked
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngAfterViewInit() method is present', () => {
        const source = `
          @NgModule()
          class Test {
            ngAfterViewInit() { console.log('AfterViewInit'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.NgModule,
          methodName: LifecycleMethods.ngAfterViewInit
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngDoCheck() method is present', () => {
        const source = `
          @NgModule()
          class Test {
            ngDoCheck() { console.log('DoCheck'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.NgModule,
          methodName: LifecycleMethods.ngDoCheck
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngOnChanges() method is present', () => {
        const source = `
          @NgModule()
          class Test {
            ngOnChanges() { console.log('OnChanges'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.NgModule,
          methodName: LifecycleMethods.ngOnChanges
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngOnInit() method is present', () => {
        const source = `
          @NgModule()
          class Test {
            ngOnInit() { console.log('OnInit'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.NgModule,
          methodName: LifecycleMethods.ngOnInit
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngOnDestroy() method is present', () => {
        const source = `
          @NgModule()
          class Test {
            ngOnDestroy() { console.log('OnDestroy'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.NgModule,
          methodName: LifecycleMethods.ngOnDestroy
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });
    });

    describe('Pipe', () => {
      it('should fail if ngAfterContentChecked() method is present', () => {
        const source = `
          @Pipe()
          class Test {
            ngAfterContentChecked() { console.log('AfterContentChecked'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Pipe,
          methodName: LifecycleMethods.ngAfterContentChecked
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngAfterContentInit() method is present', () => {
        const source = `
          @Pipe()
          class Test {
            ngAfterContentInit() { console.log('AfterContentInit'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Pipe,
          methodName: LifecycleMethods.ngAfterContentInit
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngAfterViewChecked() method is present', () => {
        const source = `
          @Pipe()
          class Test {
            ngAfterViewChecked() { console.log('AfterViewChecked'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Pipe,
          methodName: LifecycleMethods.ngAfterViewChecked
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngAfterViewInit() method is present', () => {
        const source = `
          @Pipe()
          class Test {
            ngAfterViewInit() { console.log('AfterViewInit'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Pipe,
          methodName: LifecycleMethods.ngAfterViewInit
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngDoCheck() method is present', () => {
        const source = `
          @Pipe()
          class Test {
            ngDoCheck() { console.log('DoCheck'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Pipe,
          methodName: LifecycleMethods.ngDoCheck
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngOnChanges() method is present', () => {
        const source = `
          @Pipe()
          class Test {
            ngOnChanges() { console.log('OnChanges'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Pipe,
          methodName: LifecycleMethods.ngOnChanges
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });

      it('should fail if ngOnInit() method is present', () => {
        const source = `
          @Pipe()
          class Test {
            ngOnInit() { console.log('OnInit'); }
            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          }
        `;
        const message = getFailureMessage({
          className: 'Test',
          metadataType: MetadataTypes.Pipe,
          methodName: LifecycleMethods.ngOnInit
        });
        assertAnnotated({
          message,
          ruleName,
          source
        });
      });
    });

    describe('multiple decorators per file', () => {
      it(
        'should fail if @Directive and @Pipe decorators are present on the same file and ' + 'the @Pipe contains a non allowed method',
        () => {
          const source = `
          @Pipe()
          class Test implements DoCheck {
            constructor() {}
              ngDoCheck() {}
              ~~~~~~~~~~~~~~
          }

          @Directive()
          class TestDirective implements OnInit {
            ngOnInit() {
              console.log('Initialized');
            }
          }
        `;
          const message = getFailureMessage({
            className: 'Test',
            metadataType: MetadataTypes.Pipe,
            methodName: LifecycleMethods.ngDoCheck
          });
          assertAnnotated({
            message,
            ruleName,
            source
          });
        }
      );
    });
  });

  describe('success', () => {
    describe('Component', () => {
      it('should succeed if ngAfterContentChecked() method is present', () => {
        const source = `
          @Component()
          class Test {
            ngAfterContentChecked() { console.log('AfterContentChecked'); }
          }
        `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngAfterContentInit() method is present', () => {
        const source = `
          @Component()
          class Test {
            ngAfterContentInit() { console.log('AfterContentInit'); }
          }
        `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngAfterViewChecked() method is present', () => {
        const source = `
          @Component()
          class Test {
            ngAfterViewChecked() { console.log('AfterViewChecked'); }
          }
        `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngAfterViewInit() method is present', () => {
        const source = `
          @Component()
          class Test {
            ngAfterViewInit() { console.log('AfterViewInit'); }
          }
        `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngDoCheck() method is present', () => {
        const source = `
          @Component()
          class Test {
            ngDoCheck() { console.log('DoCheck'); }
          }
        `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngOnChanges() method is present', () => {
        const source = `
          @Component()
          class Test {
            ngOnChanges() { console.log('OnChanges'); }
          }
        `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngOnDestroy() method is present', () => {
        const source = `
          @Component()
          class Test {
            ngOnDestroy() { console.log('OnDestroy'); }
          }
        `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngOnInit() method is present', () => {
        const source = `
          @Component()
          class Test {
            ngOnInit() { console.log('OnInit'); }
          }
        `;
        assertSuccess(ruleName, source);
      });
    });

    describe('Directive', () => {
      it('should succeed if ngAfterContentChecked() method is present', () => {
        const source = `
        @Directive()
        class Test {
          ngAfterContentChecked() { console.log('AfterContentChecked'); }
        }
      `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngAfterContentInit() method is present', () => {
        const source = `
        @Directive()
        class Test {
          ngAfterContentInit() { console.log('AfterContentInit'); }
        }
      `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngAfterViewChecked() method is present', () => {
        const source = `
        @Directive()
        class Test {
          ngAfterViewChecked() { console.log('AfterViewChecked'); }
        }
      `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngAfterViewInit() method is present', () => {
        const source = `
        @Directive()
        class Test {
          ngAfterViewInit() { console.log('AfterViewInit'); }
        }
      `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngDoCheck() method is present', () => {
        const source = `
        @Directive()
        class Test {
          ngDoCheck() { console.log('DoCheck'); }
        }
      `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngOnChanges() method is present', () => {
        const source = `
        @Directive()
        class Test {
          ngOnChanges() { console.log('OnChanges'); }
        }
      `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngOnDestroy() method is present', () => {
        const source = `
        @Directive()
        class Test {
          ngOnDestroy() { console.log('OnDestroy'); }
        }
      `;
        assertSuccess(ruleName, source);
      });

      it('should succeed if ngOnInit() method is present', () => {
        const source = `
        @Directive()
        class Test {
          ngOnInit() { console.log('OnInit'); }
        }
      `;
        assertSuccess(ruleName, source);
      });
    });

    describe('Injectable', () => {
      it('should succeed if ngOnDestroy() method is present', () => {
        const source = `
        @Injectable()
        class Test {
          ngOnDestroy() { console.log('OnDestroy'); }
        }
      `;
        assertSuccess(ruleName, source);
      });
    });

    describe('Pipe', () => {
      it('should succeed if ngOnDestroy() method is present', () => {
        const source = `
        @Pipe()
        class Test {
          ngOnDestroy() { console.log('OnDestroy'); }
        }
      `;
        assertSuccess(ruleName, source);
      });
    });

    describe('multiple decorators per file', () => {
      it(
        'should succeed if @Component and @Injectable decorators are present on the same file and ' +
          'the @Component contains a non allowed method for @Injectable',
        () => {
          const source = `
            @Injectable()
            class TestService {
              constructor() {}
            }

            @Component({
              selector: 'app-test',
              template: '<h1>Hello</h1>',
              providers: [TestService]
            })
            class TestComponent implements OnChanges {
              constructor(private test: TestService) {}

              ngOnChanges() {
                console.log('Initialized');
              }
            }
          `;
          assertSuccess(ruleName, source);
        }
      );
    });
  });
});
