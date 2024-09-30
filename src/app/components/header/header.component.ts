import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UseSession } from 'src/app/util/useSession';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
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
    // Adicione mais notificações conforme necessário
  ];

  constructor(private router: Router) {
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
