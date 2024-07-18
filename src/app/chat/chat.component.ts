import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from './service/message.service';
import { MessageResponse } from './domain/message_response';
import { Message } from './domain/message';
import { UseSession } from '../util/useSession';
import { SessionResponse } from '../components/modal/domain/session_response';
import { NotificationService } from '../components/notification/notification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  @ViewChild('messageList') messageList!: ElementRef;
  public messages: MessageResponse[] = [];
  public newMessage: Message;
  public useSession: UseSession;
  public session!: SessionResponse;

  constructor(
    private service: MessageService,
    private notificationService: NotificationService
  ) {
    this.newMessage = new Message();
    this.useSession = new UseSession();
    this.session = this.useSession.getSession();
  }

  ngOnInit(): void {}

  sendMessage() {
    if (this.isValidMessage()) {
      this.messages.push(new MessageResponse(this.newMessage.content, true));
      this.service
        .save(this.session.id, this.newMessage)
        .subscribe((response) => {
          this.messages.push(new MessageResponse(response.content, false));
          this.scrollToBottom();
        });
      this.newMessage = new Message();
    }
  }

  isValidMessage(): boolean {
    if (this.newMessage.content != null) {
      return true;
    }
    this.notificationService.showError(
      'Mensagem inválido por favor tente novamente.'
    );
    return false;
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