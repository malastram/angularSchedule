import { Component } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrl: './contador.component.css'
})
export class ContadorComponent {
  valorContador : number = 0;

sumar(){
  this.valorContador++;
}

restar(){
this.valorContador--;
}

}
