import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../api-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  username :string ='';
  userId : string = '';
  isLoginOk: boolean = false;
  constructor(private _userService: ApiUserService) {
    this.isLoginOk = this._userService.isLogged;
    this.username = this._userService.username;
    this.userId = this._userService.user_id;
  }

ngOnInit(): void {
  localStorage.getItem('login') ?  this.isLoginOk = true :  this.isLoginOk = false;
  const user = localStorage.getItem('user');
  this.username = user !== null ? user : '';
  const id = localStorage.getItem('id');
  this.userId = id !==null? id : '';
}
  logout() {
    this.isLoginOk = false;
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    localStorage.removeItem('id');

  }
  


}
