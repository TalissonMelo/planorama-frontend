import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment-timezone';
import label from 'src/assets/i18n/label';
import { Settings } from '../model/settings';
import { SettingsService } from '../service/configure.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { UseSession } from 'src/app/util/useSession';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css'],
})
export class ConfigureComponent implements OnInit {
  label = label;
  public timeZones: string[] = [];
  public settings: Settings = new Settings();
  public useSession: UseSession = new UseSession();

  constructor(
    private translate: TranslateService,
    private loaderService: LoaderService,
    private settingService: SettingsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.timeZones = moment.tz.names();
    if (this.useSession.getSettings() != null) {
      this.settings.timeZone = this.useSession.getSettings().timeZone;
      this.settings.language = this.useSession.getSettings().language;
    } else {
      this.settings.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.settings.language = navigator.language || navigator.languages[0];
      this.translate.use(this.settings.language.split('-')[0]);
    }
  }

  switchLanguage(language: string) {
    this.settings.language = language;
    this.translate.use(language);
  }

  saveSettings(): void {
    this.loaderService.show();
    this.settingService.save(this.settings).subscribe(
      (res) => {
        this.useSession.setSettings(res);
        this.loaderService.hide();
        this.notificationService.showSuccess(
          'Settings registered successfully!'
        );
      },
      (error) => {
        this.loaderService.hide();
        this.notificationService.showError(
          'Invalid settings entry please try again.'
        );
      }
    );
  }
}
