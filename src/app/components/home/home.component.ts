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
  // public busyHours: Home[] = [];
  public selectedDate!: string;
  // public vacantTimes: HomeFreeTimes[] = [];
  public selectedDuration: number = 30;
  public durations: any[] = [
    { value: 30, label: '30 minutos' },
    { value: 60, label: '1 hora' },
    { value: 90, label: '1h 30m' },
    { value: 120, label: '2 horas' },
  ];

  vacantTimes: HomeFreeTimes[] = [
    {
      id: '1',
      title: 'Morning Availability',
      times: [
        {
          startTime: '08:00',
          endTime: '08:30',
        },
        {
          startTime: '10:00',
          endTime: '10:30',
        },
      ],
    },
    {
      id: '2',
      title: 'Afternoon Availability',
      times: [
        {
          startTime: '13:00',
          endTime: '13:30',
        },
        {
          startTime: '15:00',
          endTime: '15:30',
        },
      ],
    },
  ];

  busyHours: Home[] = [
    {
      id: '1',
      name: 'Meeting with Team',
      startTime: '2024-10-07T09:00:00',
      endTime: '2024-10-07T10:00:00',
      sessions: [
        {
          id: '101',
          title: 'Introduction Session',
          startTime: '2024-10-07T09:00:00',
          endTime: '2024-10-07T09:30:00',
          description: 'Initial meeting to discuss project scope and roles.',
        },
        {
          id: '102',
          title: 'Project Planning',
          startTime: '2024-10-07T09:30:00',
          endTime: '2024-10-07T10:00:00',
          description: 'Planning tasks and timelines for the project.',
        },
      ],
    },
    {
      id: '2',
      name: 'Client Presentation',
      startTime: '2024-10-07T11:00:00',
      endTime: '2024-10-07T12:00:00',
      sessions: [
        {
          id: '201',
          title: 'Presentation Review',
          startTime: '2024-10-07T11:00:00',
          endTime: '2024-10-07T11:30:00',
          description: 'Review presentation slides and flow.',
        },
        {
          id: '202',
          title: 'Client Q&A',
          startTime: '2024-10-07T11:30:00',
          endTime: '2024-10-07T12:00:00',
          description: 'Addressing client questions and feedback.',
        },
      ],
    },
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
