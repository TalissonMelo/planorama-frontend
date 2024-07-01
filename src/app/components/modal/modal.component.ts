import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  events: CalendarEvent[] = [
    {
      id: 1,
      start: addHours(startOfDay(new Date()), 9),
      end: addHours(startOfDay(new Date()), 10),
      title: 'Reunião da Manhã',
      color: { primary: '#1e90ff', secondary: '#d1e8ff' },
      meta: {
        description:
          'Discussão sobre atualizações e próximos passos do projeto.',
      },
    },
  ];
  constructor(private dialogRef: MatDialogRef<ModalComponent>) {}

  close() {
    this.dialogRef.close();
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
}
