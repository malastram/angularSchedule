import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../api-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  username: string | null = '';
  userId: string | null = '';
  isLoginOk: boolean = false;
  private subscription: Subscription | null = null;
  constructor(private _userService: ApiUserService) {
    this.username = this._userService.username;
    this.userId = this._userService.user_id;
  }

  ngOnInit(): void {
    this.subscription = this._userService.isLoggedState.subscribe(
      (newState) => {
        this.isLoginOk = newState;
      }
    );
  }

}
