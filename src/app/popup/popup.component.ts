// import { Component, OnInit } from '@angular/core';
import { Component, Inject,ViewChild, ElementRef, HostListener, AfterViewInit  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.less']
})
export class PopupComponent implements AfterViewInit  {

  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    const canvas = this.canvasElement.nativeElement;
    this.context = canvas.getContext('2d')!;
    canvas.width = 400; // Set your desired canvas width
    canvas.height = 300; // Set your desired canvas height
  }
  constructor(private dialogRef: MatDialogRef<PopupComponent>) {}

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const items = event.clipboardData?.items;
    if (items) {
      // Loop through the items using traditional loops or forEach
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const blob = item.getAsFile();
          if (blob) {
            const img = new Image();
            const url = URL.createObjectURL(blob);
            img.onload = () => {
              this.context.drawImage(img, 0, 0,400,300);
              URL.revokeObjectURL(url);
            };
            img.src = url;
          }
        }
      }
    }
  }
  

  // ngOnInit(): void {
  // }

  onClose(): void {
    this.dialogRef.close();
  }

}
