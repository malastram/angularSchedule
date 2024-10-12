import { Component, OnInit, AfterViewInit, Renderer2, Input } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ApiUserService } from '../api-user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import { IPercent } from '../../../model/event.percent';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})

export class ScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  idEvent: string = '';
  titleEvent: string = '';
  descriptionEvent: string = '';
  dateEvent: Date | null = null;
 
  percent: IPercent = {user_id:'',success:'',discard:'',success_percentage:''};
//success :string = '';
//discard: string ='';
messageProgress : string = '';

  priorityEvent: string = '';
  formSendEvent: FormGroup;
  formDelete: FormGroup;
  nextButton: HTMLCollection = document.getElementsByClassName('fc-next-button');
  prevButton: HTMLCollection = document.getElementsByClassName('fc-prev-button');
  dateSelected: string = '';
  rangeValue: number = 3; // Valor inicial del rango
  rangeValuePosition: number = 0;
  calendarOptions!: CalendarOptions;
  arrayEvents: Event[] = [];
  del: Boolean = false;
  calView: string = 'dayGridMonth';
  modView: boolean = false;
  @Input()
  userId: string | null = '';

  constructor(private _userService: ApiUserService, private renderer: Renderer2, private form: FormBuilder, private router: Router) {
    this.formSendEvent = this.form.group({
      id: [''],
      date: [''],
      title: [''],
      description: [''],
      priority: ['']
    });
    this.formDelete = this.form.group({
      id: ['']
    });

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin], // Configura los plugins aquí
      initialView: this.calView, // Asegúrate de que la vista inicial está definida
      themeSystem: 'standard',
       events: [],
      eventDidMount: this.handleEventDidMount.bind(this),
      eventMouseEnter: function (info) {

      },
      eventMouseLeave: function (info) {

      }
    };
  }

  loadCalendar(arrEvents: any[]) {
    this.arrayEvents = arrEvents;
    this.calendarOptions = {
      ...this.calendarOptions,
      selectable: true,
      initialView: this.calView,
      plugins: [dayGridPlugin, interactionPlugin, bootstrap5Plugin],
      events: arrEvents,
      dateClick: (info) => {
        console.log("INFO: ");
        console.dir(info.dayEl);
        this.dateSelected = info.dateStr;
        this.formSendEvent.patchValue({
          date: this.dateSelected
        }
        );
        const modalElement = document.getElementById('staticBackdrop');
        if (modalElement) {
          const myModal = new Modal(modalElement);
          myModal.show();
        }
      },
      eventClick: (info) => {
        this.idEvent = info.event._def.extendedProps['eventid'];
        this.priorityEvent = info.event._def.extendedProps['priority'];
        this.titleEvent = info.event._def.title;
        this.descriptionEvent = info.event._def.extendedProps['description'];
        this.dateEvent = info.event.start;
        console.log("event");
        console.log(info);
        const modalElement = document.getElementById('staticBackdrop2');
        if (modalElement) {
          const myModal = new Modal(modalElement);
          myModal.show();
        }
        this.showEvent(info);
        this.formDelete.patchValue({
          id: this.idEvent
        });
      }
    }
    if (this.fullcalendar) {
      this.fullcalendar.getApi().render(); // Llama al método render´
    }
  }

  ngOnInit(): void {
    this.updateEvents();

    this._userService.percent(this.userId).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        this.percent = response;
        // this.success = response.success;
        // this.discard = response.discard;
        console.log('emit')
        console.log(response)
      },
      error: (error) => {
        console.error('Error send form:', error);
        console.log('error function send()');
      }
    });
    //asignar datos id y date
    this.formSendEvent.patchValue({
      id: this.userId
    });

if(this.percent.success_percentage!=null){
  if(parseFloat(this.percent.success_percentage)<10){
    this.messageProgress ='You must do more!!';
  }else{
    this.messageProgress ='Very good job!!';
  }
  }
}

  ngAfterViewInit(): void {
    // Asegura que fullcalendar está inicializado
    if (this.fullcalendar) {
      this.fullcalendar.getApi().render();
    }
  }

  showEvent(info: EventClickArg) {
    this.formDelete.patchValue({ id: this.idEvent });
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

  getEventClassNames(arg: any) {  //modificar clases según priority
    const priority = arg.event.extendedProps.priority;
    return `priority-${priority}`;
  }

  handleEventDidMount(arg: any) {
    const priority = arg.event.extendedProps.priority;
    const el = arg.el as HTMLElement;
    // Aplica los estilos directamente en línea
    switch (priority) {
      case 1:
        el.style.backgroundColor = '#ff9999'; // Rojo claro
        el.style.borderColor = '#ff9999';
        break;
      case 2:
        el.style.backgroundColor = '#ffcc99'; // Naranja claro
        el.style.borderColor = '#ffcc99';
        break;
      case 3:
        el.style.backgroundColor = '#ff4f99'; // Amarillo claro
        el.style.borderColor = '#ffff99';
        break;
      case 4:
        el.style.backgroundColor = '#caf3a9'; // Verde claro
        el.style.borderColor = '#ccff99';
        break;
      case 5:
        el.style.backgroundColor = '#99ceff'; // Azul claro
        el.style.borderColor = '#99ccff';
        break;
    }
  }

  delete() {
    console.log("los valores:   ");
    console.log(this.formDelete);
    console.log(this.formDelete.value['id']);
    this._userService.deleteEvent(this.formDelete.value['id']).subscribe({
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
    this._userService.getEvents(this.userId).subscribe(events => {
      console.log("los eventos:   ");
      console.log(events);
      this.loadCalendar(events);
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

  changeView(view: string) {
    switch (view) {
      case 'cal': this.modView = false;
        break;
      case 'ev': this.modView = true;
    }
    this.updateEvents();
  }

  getPercent(val: IPercent) {
    this.percent = val;
  }
}

