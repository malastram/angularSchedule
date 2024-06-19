import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnInit{

  @Input()
  events? : Array<any>

  ngOnInit(): void {
    this.events = this.events?.sort((a, b)=> b.priority - a.priority);  //order by priority desc
    console.log(this.events);
  }
}
