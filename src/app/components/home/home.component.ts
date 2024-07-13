import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/schedule/schedule-name/service/schedule.service';
import { UseSession } from 'src/app/util/useSession';
import { LoaderService } from '../loader/loader.service';
import { Home } from './domain/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public useSession: UseSession;
  public busyHours: Home[] = [];

  constructor(
    private service: ScheduleService,
    private loaderService: LoaderService
  ) {
    this.useSession = new UseSession();
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.service.listed().subscribe((res) => {
      this.busyHours = res;
      this.loaderService.hide();
    });
  }

  horariosVagos = [
    {
      horarioInicial: '10:00',
      horarioFinal: '14:00',
    },
    {
      horarioInicial: '15:00',
      horarioFinal: '17:00',
    },
  ];
}
