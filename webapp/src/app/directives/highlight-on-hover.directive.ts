import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]'
})
export class HighlightOnHoverDirective implements AfterViewInit {

  @Input("appHighlightOnHover") appHighlihtOnHoverColor: string;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'border', '1px solid transparent');
    // this.elementRef.nativeElement.style.border = `1px solid transparent`;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'border-color', this.appHighlihtOnHoverColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'border-color', 'transparent');
  }

}
