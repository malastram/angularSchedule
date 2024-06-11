import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../model/user.model';
import {IEvent} from '../../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  usersList?: IUser[];
  username : string=''; 
  user_id : string='';
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


  public addEvent(data : IEvent): Observable<any>{  //add to events table
    return this._httpClient.get<IUser[]>(this.baseURL + "/event/event?id="+data.id+"&date="+data.date+"&title="+data.title+"&description="+data.description+"&priority="+data.priority);

  }

  public getEvent(userID: string): Observable<Event[]>{
    return this._httpClient.get<Event[]>(`${this.baseURL}/event/getevent?id=${userID}`);

  }

  public setUsername(username : string){
    this.username = username;
    }

    public setIdName (id : string){
      this.user_id = id;
    }

}
