import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabContentDef, TabContentOutlet } from './tab-content.directive';
import { TabTitleDirective } from './tab-title.directive';
import { TabDirective } from './tab.directive';

@Component({
  selector: 'tabs, [tabs]',
  template: `
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TabsComponent implements AfterContentInit, OnDestroy {

  @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;
  @ContentChildren(TabTitleDirective, {descendants: true}) tabTitles: QueryList<TabTitleDirective>;

  @ContentChildren(TabContentOutlet, {descendants: true}) tabContent: QueryList<TabContentOutlet>;
  @ContentChildren(TabContentDef, {descendants: true}) tabContentDef: QueryList<TabContentDef>;

  private currentIndex = 0;
  private destroy$ = new Subject();

  constructor(private el: ElementRef) {
  }

  // TODO leka: Короче смысл такой что надо найти нужный нод и взять его индекс
  //  По скольку нельзя менять разметку для этой части задания, пришлось что-то подобное придумывать
  //  Так можно обойтись обычным хэндлером на элементе
  //  И это поддерживает какую угодно вложенность в тайтле
  //  И да тут не ниикакх сабжектов или обсерверов, так как в задание был пункт про множество таких компонентов
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    const findParentNode = function (node: HTMLElement) {
      return node.parentNode;
    }
    let node = event.target['parentNode'];
    const arr = Array.from(this.el.nativeElement.children);
    let index = arr.indexOf(node);
    while (index === -1) {
      const findedNode = findParentNode(node);
      node = findedNode;
      index = arr.indexOf(findedNode);
    }
    this.currentIndex = index;
    this.tabTitles.forEach((title, i) => title.toggle(i === index));
    this.renderContent(index);
  }

  renderContent(index: number) {
    this.tabContent.forEach((outlet) => outlet._viewContainer.clear())
    const outlet = this.tabContent['_results'][index];
    const def = this.tabContentDef['_results'][index];
    const template = def.template;
    const context = {$implicit: def.tabContentDefFrom};
    const embeddedView = outlet._viewContainer.createEmbeddedView(template, context);
    embeddedView.detectChanges();
  }

  ngAfterContentInit() {
    this.renderContent(0);
    this.tabTitles['_results'][0].toggle(true);
    this.tabs.changes.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      if (this.currentIndex + 1 > res.length && !!res.length || res.length === 1) {
        this.currentIndex = 0;
        this.tabTitles['_results'][0].toggle(true);
        this.renderContent(0);
      }
    });
  }

  ngOnDestroy() {
    this.tabContent.forEach((outlet) => outlet._viewContainer.clear())
    this.destroy$.next();
    this.destroy$.complete();
  }
}
