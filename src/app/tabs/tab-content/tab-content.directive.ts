import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({selector: 'tab-content'})
export class TabContentDirective {
}

@Directive({
  selector: '[tabContentDef]'
})
export class TabContentDef {
  constructor(public template: TemplateRef<any>) {
  }

  @Input() tabContentDefFrom;
}

@Directive({selector: '[tabContentOutlet]'})
export class TabContentOutlet {
  constructor(public _viewContainer: ViewContainerRef) {
    TabContentOutlet.recent = this;
  }

  static recent: TabContentOutlet | null = null;
}
