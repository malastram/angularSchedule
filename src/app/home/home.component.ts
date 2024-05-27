import { Component } from '@angular/core';
import { ApiUserService } from '../api-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isLoginOk: boolean = false;
  constructor(private _userService: ApiUserService) {
    this.isLoginOk = this._userService.isLogged;
  }


  logout() {
    this.isLoginOk = false;
  }
}
