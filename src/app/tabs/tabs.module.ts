import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabContentDef, TabContentDirective, TabContentOutlet } from './tab-content/tab-content.directive';
import { TabTitleDirective } from './tab-title.directive';
import { TabDirective } from './tab.directive';
import { TabsComponent } from './tabs.component';

const TABS = [
  TabsComponent,
  TabTitleDirective,
  TabDirective,

  TabContentDirective,
  TabContentDef,
  TabContentOutlet
];


@NgModule({
  declarations: [...TABS],
  imports: [
    CommonModule
  ],
  exports: [...TABS]
})
export class TabsModule {
}
