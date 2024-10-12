import { Component, OnInit, input } from '@angular/core';
import { ApiUserService } from '../api-user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  islogged: boolean = false;
  private subscription: Subscription | null = null;
  constructor(private _userService: ApiUserService) {
  }

  ngOnInit(): void {
    this.subscription = this._userService.isLoggedState.subscribe((newState) => { this.islogged = newState }
    );
  }

  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    this._userService.setisLogged(false);

  }

}
