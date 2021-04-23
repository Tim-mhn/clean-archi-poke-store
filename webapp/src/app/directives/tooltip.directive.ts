import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnDestroy {
  @Input("appTooltip") tooltip: string;
  elTooltip: any;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
   }

  @HostListener('mouseenter') onMouseEnter() {
    this._showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this._removeTooltip();
  }

  private _showTooltip() {
    console.log('show tooltip called');
    this.elTooltip = this.renderer.createElement('span');
    const text = this.renderer.createText(this.tooltip);
    this.renderer.appendChild(this.elTooltip, text);

    this.renderer.appendChild(document.body, this.elTooltip);

    let hostPos = this.elementRef.nativeElement.getBoundingClientRect();
    let tooltipPos = this.elTooltip.getBoundingClientRect();
    let top = hostPos.bottom + 5;
    let left = hostPos.left;

    this.renderer.setStyle(this.elTooltip, 'top', `${top}px`);
    this.renderer.setStyle(this.elTooltip, 'left', `${left}px`);
    this.renderer.setStyle(this.elTooltip, 'position', 'absolute');
    this.renderer.setStyle(this.elTooltip, 'color', 'white');
    this.renderer.setStyle(this.elTooltip, 'z-index', 100);
    this.renderer.setStyle(this.elTooltip, 'background-color', 'darkslateblue');
    this.renderer.setStyle(this.elTooltip, 'box-shadow', 'darkslateblue 1.95px 1.95px 2.6px');
    this.renderer.setStyle(this.elTooltip, 'padding', '8px');
    this.renderer.setStyle(this.elTooltip, 'border-radius', '4px');




  }

  private _removeTooltip() {
    if (!this.elTooltip) return
    this.renderer.removeClass(this.elTooltip, 'tooltip');
    this.renderer.removeChild(document.body, this.elTooltip);
    this.elTooltip = null;
  }

  ngOnDestroy() {
    this._removeTooltip();
  }
}
