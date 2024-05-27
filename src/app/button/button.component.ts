import { Component, Injectable } from '@angular/core';
import { ServicioGeneralService } from '../servicio-general.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

// dias? : Array<String> ;

  constructor(private _dias : ServicioGeneralService){


 }

dias : Array<String> = this._dias.getDias();



}
