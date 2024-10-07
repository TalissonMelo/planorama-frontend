import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UseSession } from 'src/app/util/useSession';
import label from 'src/assets/i18n/label';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public label = label;
  public name: string;
  public showNotifications: boolean = false;
  public activeTab: 'read' | 'unread' = 'read';

  private useSession: UseSession;

  notifications = [
    {
      title: 'Novo agendamento',
      message: 'Você tem um novo agendamento.',
      time: '14h',
      isRead: true,
    },
    {
      title: 'Lembrete de reunião',
      message: 'Reunião amanhã às 10h.',
      time: '12h',
      isRead: false,
    },
  ];

  constructor(private router: Router, public translate: TranslateService) {
    this.useSession = new UseSession();
    this.name = this.useSession.getUser().nickname;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  setActiveTab(tab: 'read' | 'unread') {
    this.activeTab = tab;
  }

  getNotifications() {
    return this.notifications.filter((notification) =>
      this.activeTab === 'read' ? notification.isRead : !notification.isRead
    );
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.useSession.clear();
    this.router.navigate(['/login']);
  }
}
