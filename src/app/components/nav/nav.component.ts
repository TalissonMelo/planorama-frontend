import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UseSession } from 'src/app/util/useSession';
import label from 'src/assets/i18n/label';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  public useSession: UseSession = new UseSession();
  label = label;

  constructor(private router: Router, public translate: TranslateService) {}

  logout() {
    this.useSession.clear();
    this.router.navigate(['/login']);
  }

  schedule() {
    this.router.navigate(['/schedule']);
  }

  legend() {
    this.router.navigate(['/legend']);
  }

  configure() {
    this.router.navigate(['/configure']);
  }

  home() {
    this.router.navigate(['/']);
  }
}
