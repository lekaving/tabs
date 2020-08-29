import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// TODO leka: Короче не стал разносить на разыне файлы так как они мелкие и почти ничего не содержат в себе
//  Смысл такой tab-content пустой так как в задание именно такая разметка
//  Дальше структурная директива которая которая в себя принимает какой-то шаблон и данные, она матчиться в родителе
//  И аутлет куда все это рендерить по клику

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
  }
}
