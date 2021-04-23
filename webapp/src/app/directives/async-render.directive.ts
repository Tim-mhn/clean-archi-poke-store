import { ChangeDetectorRef, ComponentFactory, ComponentFactoryResolver, Directive, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { AsyncSubject, Observable, Subject } from 'rxjs';
import { concatMapTo, takeUntil } from 'rxjs/operators';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';

export interface ObserveContext<T> {
  $implicit: T;
  observe: T;
}

export interface ErrorContext {
  $implicit: Error;
}

@Directive({
  selector: '[asyncRender]'
})
export class AsyncRenderDirective<T> implements OnDestroy, OnInit {
  private errorRef: TemplateRef<ErrorContext>;
  private beforeRef: TemplateRef<null>;
  private unsubscribe = new Subject<boolean>();
  private init = new AsyncSubject<void>();
  private loadingComponentFactory: ComponentFactory<LoadingSpinnerComponent>;
  private errorComponentFactory: ComponentFactory<ErrorMessageComponent>;


  constructor(
    private view: ViewContainerRef,
    private nextRef: TemplateRef<ObserveContext<T>>,
    private changes: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { 
    this.loadingComponentFactory = this.componentFactoryResolver.resolveComponentFactory(LoadingSpinnerComponent);
    this.errorComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ErrorMessageComponent);

  }

  @Input()
  set asyncRender(source: Observable<T>) {
    if (!source) {
      return
    }
    this.showBefore()
    this.unsubscribe.next(true);
    this.init.pipe(
      concatMapTo(source),
      takeUntil(this.unsubscribe)
    ).subscribe(value => {
      this.view.clear()
      this.view.createEmbeddedView(this.nextRef, { $implicit: value, observe: value })
      this.changes.markForCheck()
    }, error => {
      this.view.clear()
      if (this.errorRef) {
        this.view.createEmbeddedView(this.errorRef, { $implicit: error })
      } else {
        this.view.createComponent(this.errorComponentFactory);
      }
      this.changes.markForCheck()

    })
  }

  @Input()
  set asyncRenderError(ref: TemplateRef<ErrorContext>) {
    this.errorRef = ref;
  }

  @Input()
  set asyncRenderBefore(ref: TemplateRef<null>) {
    this.beforeRef = ref;
  }

  ngOnDestroy() {
    this.unsubscribe.next(true)
  }

  ngOnInit() {
    this.showBefore()
    this.init.next()
    this.init.complete()
  }

  private showBefore(): void {
    this.view.clear()
    // If beforeRef has been given, create and render component from the template ref
    if (this.beforeRef) {
      this.view.createEmbeddedView(this.beforeRef)
    }
    // Otherwise create and insert the default loading component  
    else {
      this.view.createComponent(this.loadingComponentFactory);
    }
  }
}
