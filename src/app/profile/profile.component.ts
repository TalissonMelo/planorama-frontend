import { Component } from '@angular/core';
import { LoaderService } from '../components/loader/loader.service';
import { NotificationService } from '../components/notification/notification.service';
import { UseSession } from '../util/useSession';
import { ChangePasswordRequest } from './model/change_password_request';
import { UserUpdateRequest } from './model/user_update_request';
import { ProfileService } from './service/profile.service';
import { Router } from '@angular/router';
import label from 'src/assets/i18n/label';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  public phone: string = '';
  public label = label;
  public passwordConfirm: string = '';
  public useSession: UseSession = new UseSession();

  constructor(
    private router: Router,
    private service: ProfileService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}
}
