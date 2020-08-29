import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public tabs = [ 1, 2 ];

  // TODO leka: и да эта реализация может выдержать и быстро отработать даже столько элементов
  //  Только скорость рендера первоначальная зависит
  some = Array.from({length: 5000}, () => 0);

  public dec() {
    this.tabs = this.tabs.slice(0, -1);
  }

  public inc() {
    this.tabs = [ ...this.tabs, (this.tabs.length + 1) ];
  }
}
