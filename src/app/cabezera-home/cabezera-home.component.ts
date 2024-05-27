import { Component } from '@angular/core';

@Component({
  selector: 'app-cabezera-home',
  templateUrl: './cabezera-home.component.html',
  styleUrl: './cabezera-home.component.css'
})
export class CabezeraHomeComponent {
  cabezera: string = 'Mi agenda personal';
  subCabezera: string = 'Maneja de manera simple tu dia a dia'; 

}
