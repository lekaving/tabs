import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'tab-title',
})
export class TabTitleDirective {

  constructor(public elementRef: ElementRef) {
  }

  toggle(isActive: boolean) {
    if (isActive) {
      this.elementRef.nativeElement.classList.add('active');
    } else {
      this.elementRef.nativeElement.classList.remove('active');
    }
  }

}
