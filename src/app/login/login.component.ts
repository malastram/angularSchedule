import { Component, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApiUserService } from '../api-user.service';
import { ApiPruebaComponent } from '../api-prueba/api-prueba.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogIn: FormGroup;
  constructor(private form: FormBuilder, private _userService: ApiUserService, private regenerarHome: ApiPruebaComponent, private router: Router) {
    this.formLogIn = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  send(): void {
    const formData = this.formLogIn.value;
    console.log("values:");
    console.log(formData);
    this._userService.login(formData).subscribe({
      next: (response) => {
        console.log('Server response:', response);
        // Llama a la función proporcionada después de un registro exitoso
       if(response.length>0){
  this.regenerarHome.loadUsers();
        localStorage.setItem('login','true');
        localStorage.setItem('user',this.formLogIn.value['username']);
        localStorage.setItem('id',response[0]['user_id']);

         localStorage.getItem('login') ? this._userService.isLogged = true : this._userService.isLogged = false;

        this._userService.setUsername(response[0]['username']);
        this._userService.setIdName(response[0]['user_id']);  //new


        console.log(response);
        this.router.navigate(['']);
       }else{
        alert("Login fails!");
       }
      
      },
      error: (error) => {
        console.error('Error send form:', error);
        console.log('error function loginUser');
        // alert('There was an error in retrieving data from the server');
      }
    });
  }
  hasErrors(controlName: string, errorType: string) {
    return this.formLogIn?.get(controlName)?.hasError(errorType) && this.formLogIn.get(controlName)?.touched

  }
}
