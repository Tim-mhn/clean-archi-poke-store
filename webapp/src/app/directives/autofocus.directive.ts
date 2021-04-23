import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit  {

  constructor(private element: ElementRef) { }
  ngOnInit(): void {
    this.element.nativeElement.focus()
  }



}
