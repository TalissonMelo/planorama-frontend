import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UseSession } from 'src/app/util/useSession';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  public useSession: UseSession = new UseSession();

  constructor(private router: Router) {}

  logout() {
    this.useSession.clear();
    this.router.navigate(['/login']);
  }
}
