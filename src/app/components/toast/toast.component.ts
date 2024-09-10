import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  showToast: boolean = false;

  ngOnInit(): void {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  closeToast() {
    this.showToast = false;
  }
}
