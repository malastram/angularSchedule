import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioGeneralService {
diasSemana : Array<String> =['lunes','martes','miercoles','jueves','viernes','sabado','domingo'];

   getDias(){
    return this.diasSemana || '';
   }
}
