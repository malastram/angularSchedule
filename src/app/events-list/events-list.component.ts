import { Component, Input, OnInit, Output, inject, EventEmitter } from '@angular/core';
import { ApiUserService } from '../api-user.service';
import { IPercent } from '../../../model/event.percent';
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnInit {
  _userService = inject(ApiUserService);

  @Input()
  events?: Array<any>
  userId: string = '';

  // @Output() percentEvents = new EventEmitter<string>();
  @Output() percentEvents = new EventEmitter<IPercent>();

  ngOnInit(): void {
    this.events = this.events?.sort((a, b) => b.priority - a.priority);  //order by priority desc
    console.log(this.events);
    this._userService.user_id !== null ? this.userId = this._userService.user_id : this.userId = '';
    this.sendPercent(this.userId);
  }

  success(id: string) {
    if (this.userId !== '') {
      this.sendSuccess(id, this.userId);
      this.sendPercent(this.userId)
    } else {
      alert("Fails!")
    }
  }

  discard(id: string) {
    if (this.userId !== '') {
      this.sendDiscard(id, this.userId);
      this.sendPercent(this.userId)

    } else {
      alert("Fails!")
    }
  }

  sendPercent(userId: string) {
    this._userService.percent(userId).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        this.percentEvents.emit(response);
      },
      error: (error) => {
        console.error('Error send form:', error);
        console.log('error function send()');
      }
    });
  }

  sendSuccess(idev: string, idus: string) {
    this._userService.addSuccess(idev, idus).subscribe({
      next: (response) => {
        console.log('Server response:', response);
      //  this.percentEvents.emit(response);
      this.sendPercent(idus);
      console.log("RELOAD")
      this.reloadEvents()
  
      },
      error: (error) => {
        console.error('Error send form:', error);
        console.log('error function send()');
      }
    });
 
  }

  sendDiscard(idev: string, idus: string) {
    this._userService.addDiscard(idev, idus).subscribe({
      next: (response) => {
        console.log('Server response:', response);
       // this.percentEvents.emit(response);
       this.sendPercent(idus);
       console.log("RELOAD")
       this.reloadEvents()
   

      },
      error: (error) => {
        console.error('Error send form:', error);
        console.log('error function send()');
      }
    });
  }

  reloadEvents(): any {
    this._userService.getEvents(this.userId).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        this.events = response;
      },
      error: (error) => {
        console.error('Error send form:', error);
        console.log('error function send()');
      }
    });
  }
}
