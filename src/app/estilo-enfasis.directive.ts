import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEstiloEnfasis]'
})
export class EstiloEnfasisDirective {

  constructor(private Element : ElementRef) {
    this.Element.nativeElement.style.backgroundColor = 'yellow';
   }

}
