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
  private useSession: UseSession;

  constructor() {
    this.useSession = new UseSession();
    this.name = this.useSession.getUser().nickname;
  }
}
