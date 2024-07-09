import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'image-paste';

  constructor(private dialog: MatDialog) {}

  openPopup(): void {
    this.dialog.open(PopupComponent);
  }
}
