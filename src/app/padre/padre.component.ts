import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-padre',
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.css'
})
export class PadreComponent {

  mensajeRecibido : string ='';

  recibirMensaje($event: string){
    this.mensajeRecibido = $event;
  }
}
