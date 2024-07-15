import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from './service/message.service';
import { MessageResponse } from './domain/message_response';
import { Message } from './domain/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('messageList') messageList!: ElementRef;
  public messages: MessageResponse[] = [];
  public message: Message;

  constructor(private service: MessageService) {
    this.message = new Message();
  }

  ngOnInit(): void {}

  sendMessage() {
    this.messages.push(new MessageResponse(this.message.content, true));
    this.service.save(this.message).subscribe((response) => {
      this.messages.push(new MessageResponse(response.content, false));
      this.scrollToBottom();
    });
    this.message = new Message();
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        const lastMessage = this.messageList.nativeElement.querySelector(
          `#message-${this.messages.length - 1}`
        );
        if (lastMessage) {
          lastMessage.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error('Scroll to bottom error:', err);
    }
  }
}
