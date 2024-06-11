import { Component, OnInit, AfterViewInit, Renderer2, Input } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ApiUserService } from '../api-user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;

  formSendEvent: FormGroup;
  nextButton: HTMLCollection = document.getElementsByClassName('fc-next-button');
  prevButton: HTMLCollection = document.getElementsByClassName('fc-prev-button');
  dateSelected: string = '';
  rangeValue: number = 3; // Valor inicial del rango
  rangeValuePosition: number = 0;
  calendarOptions!: CalendarOptions;
  arrayEvents: Event[] = [];
  del: Boolean =false;
  @Input()
  userId: string = '';

  constructor(private _userService: ApiUserService, private renderer: Renderer2, private form: FormBuilder, private router: Router) {
    this.formSendEvent = this.form.group({
      id: [''],
      date: [''],
      title: [''],
      description: [''],
      priority: ['']
    });
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin], // Configura los plugins aquí
      initialView: 'dayGridMonth', // Asegúrate de que la vista inicial está definida
      events: [],
      eventColor: '#378006',
      eventMouseEnter: function(info){
        console.dir(info.event._def.title);
       const box = document.getElementsByClassName('fc-event-title');
      for(let i=0; i<box.length;i++){
        if(box[i].innerHTML ==info.event._def.title){
          (box[i] as HTMLElement).style.fontSize ='24px';
         // document.getElementsByClassName('fc-event-title')[i].style
        }
      }
      },
      eventMouseLeave: function(info){
        console.dir(info.event._def.title);
        const box = document.getElementsByClassName('fc-event-title');
       for(let i=0; i<box.length;i++){
         if(box[i].innerHTML ==info.event._def.title){
           (box[i] as HTMLElement).style.fontSize ='14px';
          // document.getElementsByClassName('fc-event-title')[i].style
         }
       }
      }
    };
  }

  loadCalendar(arrEvents: any[]) {

    this.calendarOptions = {
      ...this.calendarOptions,
      selectable: true,

      plugins: [dayGridPlugin, interactionPlugin],
      events: arrEvents,
      dateClick: (info) => {
        console.log("INFO: ");
        this.dateSelected = info.dateStr;
        this.formSendEvent.patchValue({
          date: this.dateSelected
        });

      },
      eventClick: (info)=>{
        
        this.showEvent(info);
    }
  }
   

    if (this.fullcalendar) {
      this.fullcalendar.getApi().render(); // Llama al método render´
    }
  }


  ngOnInit(): void {
    this.updateEvents();
    //asignar datos id y date
    this.formSendEvent.patchValue({
      id: this.userId
    });
  }

  ngAfterViewInit(): void {
    this.nextButton[0].addEventListener('click', () => {
      this.addCellsListeners();
    });  //si no se hace así, this se refiere al elemento nextButton[0]
    this.prevButton[0].addEventListener('click', () => {
      this.addCellsListeners();
    });
    this.addCellsListeners();


    // Asegura que fullcalendar está inicializado
    if (this.fullcalendar) {
      this.fullcalendar.getApi().render();
    }
  }

showEvent(info : EventClickArg){
  alert(info);
  info.jsEvent.stopPropagation();
}


  addCellsListeners(): void {
    let cells = document.getElementsByClassName("fc-day");
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i] as HTMLElement; // Asegúrate de que el tipo es HTMLElement
      this.renderer.setAttribute(cell, "data-bs-toggle", "modal");
      this.renderer.setAttribute(cell, "data-bs-target", "#staticBackdrop");
    }
  }

  send(): void {
    const formData = this.formSendEvent.value;
    console.log("form:");
    console.log(this.formSendEvent);
    this._userService.addEvent(formData).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        this.updateEvents();

      },
      error: (error) => {
        console.error('Error send form:', error);
        console.log('error function send()');
      }
    });
  }


  updateEvents() {
    this._userService.getEvent(this.userId).subscribe(events => {
      this.loadCalendar(events);
      console.dir(events);
    });
  }

  updateValue(event: any): void {
    const rangeInput = document.getElementById('priority') as HTMLInputElement;
    const rangeDisplay = document.getElementById('rangeValueDisplay') as HTMLElement;
    const value = this.rangeValue;
    const percent = (value - parseInt(rangeInput.min)) / (parseInt(rangeInput.max) - parseInt(rangeInput.min));
    const rangeWidth = rangeInput.offsetWidth;
    const rangeDisplayWidth = rangeDisplay.offsetWidth;
    const offset = (rangeWidth - rangeDisplayWidth) * percent;
    this.rangeValuePosition = offset;
  }


  hasErrors(controlName: string, errorType: string) {
    return this.formSendEvent?.get(controlName)?.hasError(errorType) && this.formSendEvent.get(controlName)?.touched

  }

}



