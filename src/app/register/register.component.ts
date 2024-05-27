import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApiUserService } from '../api-user.service';
import { IUser } from '../../../model/user.model';
import { ApiPruebaComponent } from '../api-prueba/api-prueba.component';
import { debounceTime, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  isValid: boolean = false;
  formSignIn: FormGroup;
  users?: IUser[];
  usernameExists: boolean = false;

  constructor(private form: FormBuilder, private _userService: ApiUserService, private regenerarHome: ApiPruebaComponent) {
    this.formSignIn = this.form.group({
      username: ['', Validators.required],
      passwords: this.form.group({
        pass1: ['', [Validators.required, Validators.minLength(6)]],
        pass2: ['', [Validators.required, Validators.minLength(6)]]
      }, { validator: this.passwordMatchValidator }),
      email: ['', [Validators.required, Validators.email]],
      country: new FormControl,
      city: new FormControl,
      gender: new FormControl,
      age: new FormControl
    });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('pass1');
    const confirmPassword = group.get('pass2');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { mismatch: true };
    }
    return null;
  }

  send(): void {
    if (this.formSignIn.status == "VALID") {
      if (!this.usernameExists) {
        console.log(this.formSignIn);
        console.log(this.formSignIn.status);
        alert(this.usernameExists);
        const formData = this.formSignIn.value;
        this._userService.addUser(formData).subscribe({
          next: (response) => {
            console.log('Server response:', response);
            // Llama a la función proporcionada después de un registro exitoso
            this.regenerarHome.loadUsers();

          },
          error: (error) => {
            console.error('Error send form:', error);
            console.log('error function adduser');
            //alert('There was an error in retrieving data from the server');
          }
        });
      } else {
        alert("username already exists!");
      }
    } else {
      alert("Signup don't success");
    }
  }

  hasErrors(controlName: string, errorType: string) {
    return this.formSignIn.get(controlName)?.hasError(errorType) && this.formSignIn.get(controlName)?.touched

  }

  ngOnInit(): void {
    this.formSignIn.get('username')?.valueChanges.pipe(
      debounceTime(300), // espera 300ms después de que el usuario deja de escribir
      switchMap(value => this._userService.getUsers())
    ).subscribe(users => {
      const username = this.formSignIn.get('username')?.value;
      this.usernameExists = users.some(user => user.username === username);
    });
  }
  onSubmit() {

  }
}
