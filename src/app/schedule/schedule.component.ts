import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  //standalone: true
})
export class ScheduleComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],

    events: [
      { title: 'Evento 1', date: '2024-05-01' },
      { title: 'Evento 2', date: '2024-05-02' }
    ]
  };

  constructor() {}

  ngOnInit(): void {
  }
}
