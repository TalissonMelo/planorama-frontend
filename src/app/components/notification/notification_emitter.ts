import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationEmitter {
  public notificationEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  emitNotification(message: string) {
    this.notificationEmitter.emit(message);
  }
}
