import { ComponentFactoryResolver, ComponentRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';

@Directive({
  selector: '[appRenderOrSpinner]'
})
export class RenderOrSpinnerDirective {

  private loadingSpinnerRef: ComponentRef<LoadingSpinnerComponent>;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,

  ) { }

  @Input()
  set appRenderOrSpinner(canRender: boolean) {
    if (canRender) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      if (this.loadingSpinnerRef) this.loadingSpinnerRef.destroy();
    } else {
      this.loadingSpinnerRef = this.viewContainer.createComponent(
        this.resolver.resolveComponentFactory(LoadingSpinnerComponent)
      );
    }
  }
}
