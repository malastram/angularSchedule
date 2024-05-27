import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  usersList?: IUser[];
  isLogged: boolean = false;
  private baseURL = 'http://localhost/api_rest_schedule/index.php';
  private addUserURL = "http://localhost/api_rest_schedule/adduser.php";

  constructor(private _httpClient: HttpClient) {
  }
  public getUsers(): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(this.baseURL + "/user/list");
  }

  //public 
  public addUser(data: IUser): Observable<IUser> {
    console.log(data);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._httpClient.post<IUser>(this.addUserURL, data, { headers });


  }

  public login(data: IUser): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._httpClient.post<any>(`${this.baseURL}/login/`, data, { headers });
  }

}
