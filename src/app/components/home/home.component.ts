import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/schedule/schedule-name/service/schedule.service';
import { UseSession } from 'src/app/util/useSession';
import { LoaderService } from '../loader/loader.service';
import { Home } from './domain/home';
import { HomeFreeTimes } from './domain/home_free_times';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public useSession: UseSession;
  public busyHours: Home[] = [];
  public selectedDate!: string;
  public vacantTimes: HomeFreeTimes[] = [];
  public selectedDuration: number = 30;
  public durations: any[] = [
    { value: 30, label: '30 minutos' },
    { value: 60, label: '1 hora' },
    { value: 90, label: '1h 30m' },
    { value: 120, label: '2 horas' },
  ];

  constructor(
    private service: ScheduleService,
    private loaderService: LoaderService
  ) {
    this.useSession = new UseSession();
  }

  ngOnInit(): void {
    // this.initialDate();
    // this.selectDay();
  }

  public initialDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.selectedDate = `${year}-${month}-${day}`;
  }

  onDateChange(event: any) {
    this.selectedDate = event.value.toISOString().split('T')[0];
    //this.selectDay();
  }

  selectDay(): void {
    this.loaderService.show();
    this.service.listed(this.selectedDate).subscribe((res) => {
      this.busyHours = res;
      this.listVacanTimes();
    });
  }

  listVacanTimes(): void {
    this.service
      .listedFree(this.selectedDate, this.selectedDuration)
      .subscribe((response) => {
        this.vacantTimes = response;
        this.loaderService.hide();
      });
  }

  onDurationChange(event: any) {
    this.listVacanTimes();
  }
}
