import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'tab-title',
})
export class TabTitleDirective {

  @Input() index: number;

  constructor(public elementRef: ElementRef) {
  }

  toggle(isActive: boolean) {
    this.elementRef.nativeElement.focus({preventScroll: true});
    if (isActive) {
      this.elementRef.nativeElement.classList.add('active');
    } else {
      this.elementRef.nativeElement.classList.remove('active');
    }
  }

}
