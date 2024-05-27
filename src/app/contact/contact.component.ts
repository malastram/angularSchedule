import {
  Component,

} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  isValid: boolean =false;
  form1: FormGroup;
  constructor(private form: FormBuilder) {
    this.form1 = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });

  }


  send() {

    if(this.form1.valid){
    console.log(this.form1);
    this.isValid=true;
}else{
  this.isValid=false;

  alert("NO");
}
  }

  hasErrors(controlName: string, errorType: string){
    return this.form1.get(controlName)?.hasError(errorType) && this.form1.get(controlName)?.touched;
  }
}
