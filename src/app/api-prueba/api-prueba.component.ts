import { Component, Injectable, OnInit } from '@angular/core';
import { ApiUserService } from '../api-user.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../model/user.model';



@Component({
  selector: 'app-api-prueba',
  templateUrl: './api-prueba.component.html',
  styleUrl: './api-prueba.component.css'
})

@Injectable({ providedIn: 'root' })
export class ApiPruebaComponent implements OnInit{
  users?:IUser[] ;
constructor(private _usersService: ApiUserService){}

  ngOnInit(): void {
    this.loadUsers();
    
  }

  loadUsers(): void {
    this._usersService.getUsers().subscribe(data=>{
      this.users =data;
      console.log(this.users)
     });
  }

  onUserRegistered(): void {
    this.loadUsers();
  }


}
