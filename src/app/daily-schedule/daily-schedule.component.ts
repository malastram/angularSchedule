import { Component, OnInit, AfterViewInit, Renderer2, Input } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ApiUserService } from '../api-user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import { IPercent } from '../../../model/event.percent';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { DailyEvent } from '../../../model/dailyEvent.model';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrl: './daily-schedule.component.css'
})
export class DailyScheduleComponent implements OnInit {

  rangeValue: number = 3; // Valor inicial del rango
  rangeValuePosition: number = 0;
  startHour: string = '';
  selectedTime: string = '';
  day: string = '';
  formSendEvent: FormGroup;
  formDelete: FormGroup;

  userId: string | null = this._userService.user_id;
  username: string | null = this._userService.username;
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;
  arrayDailyEvents: DailyEvent[] = [];
  startFull: String = '';
  eventSelected: string = '';
  idEventSelected: string = ''

  errorMessage: string = '';
  isInvalidTime: boolean = false; // Variable de control para validación


  calendarOptions: CalendarOptions;
  constructor(private form: FormBuilder, private _userService: ApiUserService) {
    this.formSendEvent = this.form.group({
      userid: [''],
      daysOfWeek: [''],
      startTime: [''],
      endTime: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      priority: ['']
    });
    this.formDelete = this.form.group({
      id: ['']
    });
    this.calendarOptions = {
      plugins: [timeGridPlugin, interactionPlugin, bootstrap5Plugin], // Configura los plugins aquí
      initialView: 'timeGridWeek', // Asegúrate de que la vista inicial está definidagrid
      themeSystem: 'bootstrap5',
      slotMinTime: '08:00:00',
      slotMaxTime: '24:00:00',
      firstDay: 1,
      dayHeaderFormat: { weekday: 'long' }, // Solo muestra el nombre del día
      nowIndicator: true,
      events: this.arrayDailyEvents,
      eventTextColor: 'black',
      headerToolbar:
      {
        start: '', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: '' // will normally be on the right. if RTL, will be on the left
      },
      allDaySlot: false,
      eventMouseEnter: function (info) {
      },
      eventMouseLeave: function (info) {

      },
      //  eventAdd: this.handleEventDidMount.bind(this),


      dateClick: (info) => {
        this.startHour = info.date.getHours().toString().padStart(2, '0') + ":00";
        this.formSendEvent.patchValue({
          userid: this.userId,
          startTime: this.startHour
        }
        );
        const modalElement = document.getElementById('staticBackdrop');
        if (modalElement) {
          const myModal = new Modal(modalElement);
          myModal.show();
        }
      },
    };
  }

  ngOnInit(): void {
    this.userId = this._userService.user_id;
    this.updateEvents();
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

  getEventClassNames(arg: any) {  //modificar clases según priority
    const priority = arg.event._def.extendedProps.priority;
    return `priority-${priority}`;
  }


  send(): void {
    if (this.formSendEvent.status == "VALID") {

      const formData = this.formSendEvent.value;
      console.log("form:");
      console.log(this.formSendEvent);
      this._userService.addDailyEvent(formData).subscribe({
        next: (response) => {
          console.log('Server response:', response);
          this.updateEvents();
        },
        error: (error) => {
          if (error.status === 0) {
            console.error('An error occurred:', error.message);
          } else {
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
        }
      });
    } else {
      alert("Signup don't success");
    }
  }

  updateEvents() {
    this._userService.getDailyEvents(this.userId).subscribe(events => {
      console.log(events);
      this.loadCalendar(events);
    });
  }

  loadCalendar(arrEvents: any[]) {
    this.arrayDailyEvents = arrEvents;
    this.arrayDailyEvents.forEach(element => {
      switch (element.priority) {
        case '1':
          element.color = '#ff9999'

          break;
        case '2':
          element.color = '#ffcc99'; // Naranja claro

          break;
        case '3':
          element.color = '#ff4f99'; // Amarillo claro

          break;
        case '4':
          element.color = '#caf3a9'; // Verde claro

          break;
        case '5':
          element.color = '#99ceff'; // Azul claro

          break;
      }

    });
    console.dir(this.arrayDailyEvents)
    this.calendarOptions = {
      ...this.calendarOptions,
      selectable: true,
      initialView: 'timeGridWeek',
      plugins: [timeGridPlugin, interactionPlugin, bootstrap5Plugin],
      // eventDidMount: this.handleEventDidMount.bind(this),

      events: this.arrayDailyEvents,


      dateClick: (info) => {

        this.day = info.date.getDay().toString();
        this.startHour = info.date.getHours().toString().padStart(2, '0') + ":00";
        this.formSendEvent.patchValue({
          startTime: this.startHour,
          userid: this.userId,
          daysOfWeek: this.day
        }
        );
        const modalElement = document.getElementById('staticBackdrop');
        if (modalElement) {
          const myModal = new Modal(modalElement);
          myModal.show();
        }
      },
      eventClick: (info) => {
        this.eventSelected = info.event._def.title
        this.idEventSelected = info.event._def.extendedProps['idevent']
        this.formDelete.patchValue({
           id: this.idEventSelected 
          });

        console.dir(info)
        const modalElement = document.getElementById('staticBackdrop2');
        if (modalElement) {
          const myModal = new Modal(modalElement);
          myModal.show();
        }
        //alert("Description: " + info.event._def.extendedProps['description'])
      }
    }
    if (this.fullcalendar) {
      this.fullcalendar.getApi().render(); // Llama al método render´
    }
  }

  ngAfterViewInit(): void {
    // Asegura que fullcalendar está inicializado
    if (this.fullcalendar) {
      this.fullcalendar.getApi().render();
    }
  }
  download() {
    const captureDiv = document.getElementById('calendar') as HTMLElement;

    html2canvas(captureDiv).then(canvas => {
      // Convierte el canvas a una URL de imagen en formato PNG
      const imgData = canvas.toDataURL("image/png");

      // Crea un enlace de descarga
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "captura.png"; // Nombre del archivo descargado
      link.click(); // Simula un clic en el enlace
    });


  }

  delete() {
    console.log("los valores:   ");
    console.log(this.formDelete);
    console.log(this.formDelete.value['id']);
    this._userService.deleteDailyEvent(this.formDelete.value['id']).subscribe({ 
      next: (response) => {
        console.log('Server response:', response);
        this.updateEvents();
      },
      error: (error) => {
        console.error('Error delete form:', error);
        console.log('error function delete()');
      }
    });

  }

  validateTime() {
    this.isInvalidTime = false;

    const start = this.startHour;
    const end = this.selectedTime;
    let hasConflict = false;
    let arrev = this.arrayDailyEvents;
    arrev.forEach(event => {
      const eventStart = event.startTime;
      const eventEnd = event.endTime;
      if (event.daysOfWeek == this.day) { //eventos del día
        // Comprobar si los tiempos se superponen
        if ((start >= eventStart && start < eventEnd) ||  // Comienza dentro de otro evento
          (end > eventStart && end <= eventEnd) ||  // Termina dentro de otro evento
          (start <= eventStart && end >= eventEnd)) {  // Lo contiene completamente
          hasConflict = true;
        }
      }
    });
    const submit = document.getElementById("submit") as HTMLInputElement;
    console.log("selectedTime:   " + this.selectedTime)
    console.log("startHour:   " + this.startHour)
    console.log(this.selectedTime < this.startHour)
    if (this.selectedTime < this.startHour) {
      if (hasConflict) {
        submit.disabled = true;
        this.isInvalidTime = true;
        this.errorMessage = 'conflicto entre horas'
      } else {
        hasConflict = false
        this.isInvalidTime = true; // Mostrar mensaje de error
        submit.disabled = true;
        this.errorMessage = ' La hora seleccionada no puede ser inferior a ' + this.startHour
      }

    } else {
      if (hasConflict) {
        submit.disabled = true;
        this.isInvalidTime = true;
        this.errorMessage = 'conflicto entre horas'
      } else {
        hasConflict = false
        this.isInvalidTime = false; // Es una hora válida
        submit.disabled = false;

      }
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formSendEvent?.get(controlName)?.hasError(errorType) && this.formSendEvent.get(controlName)?.touched
  }

}

