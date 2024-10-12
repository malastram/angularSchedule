import { Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../../model/user.model';
import { IEvent } from '../../model/event.model';
import { IPercent } from '../../model/event.percent';
import { DailyEvent } from '../../model/dailyEvent.model';
import { dA } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  usersList?: IUser[];
  username: string | null = '';
  user_id: string | null = '';
  private isLogged = new BehaviorSubject<boolean>(false);   // Inicializar la variable booleana con un valor predeterminado (false en este caso)
  isLoggedState = this.isLogged.asObservable();   // Observable que los componentes pueden suscribirse para recibir cambios
  private baseURL = 'http://localhost/api_rest_schedule/index.php';
  private addUserURL = "http://localhost/api_rest_schedule/adduser.php";

  constructor(private _httpClient: HttpClient) {
    if (localStorage.getItem('login') != null) {
      this.setisLogged(true)
      if (localStorage.getItem("id") != null) {
        this.user_id = localStorage.getItem("id");
      }
      if (localStorage.getItem("user") != null) {
        this.username = localStorage.getItem("user");
      }
    }
  }

  public getUsers(): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(this.baseURL + "/user/list");
  }

  public addUser(data: IUser): Observable<IUser> {
    console.log(data);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._httpClient.post<IUser>(this.addUserURL, data, { headers });
  }

  public login(data: IUser): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this._httpClient.post<any>(`${this.baseURL}/login/`, data, { headers });
  }

  public addEvent(data: IEvent): Observable<any> {  //add to events table
    if (!data.description) data.description = 'No description';
    return this._httpClient.get<IUser[]>(this.baseURL + "/event/event?id=" + data.id + "&date=" + data.date + "&title=" + data.title + "&description=" + data.description + "&priority=" + data.priority);
  }

  public getEvents(userID: string | null): Observable<IPercent[]> {
    return this._httpClient.get<IPercent[]>(`${this.baseURL}/event/getevent?id=${userID}`);
  }

  public deleteEvent(data: string): Observable<any> {
    return this._httpClient.get<Event[]>(`${this.baseURL}/delevent/delevent?id=${data}`);
  }

  public deleteDailyEvent(data: string): Observable<any> {
    return this._httpClient.get<Event[]>(`${this.baseURL}/deldailyevent/deldailyevent?id=${data}`);
  }
  public addSuccess(idEvent: string, idUser: string) {
    return this._httpClient.get<any>(`${this.baseURL}/success?idevent=${idEvent}&iduser=${idUser}`);
  }

  public addDiscard(idEvent: string, idUser: string) {
    return this._httpClient.get<any>(`${this.baseURL}/discard?idevent=${idEvent}&iduser=${idUser}`);
  }

  public percent(id: string | null) : Observable<any> {
    return this._httpClient.get<string[]>(`${this.baseURL}/percent?iduser=${id}`)
  }
//NEW-------------------------------------------------------------------------------------------

  public addDailyEvent(data:DailyEvent) { 
    return this._httpClient.get<any>(`${this.baseURL}/addDailyEvent?userid=${data.userid}&daysOfWeek=${data.daysOfWeek}&startTime=${data.startTime}&endTime=${data.endTime}&title=${data.title}&description=${data.description}&priority=${data.priority}`);
  }  

  public getDailyEvents(id: string | null): Observable<DailyEvent[]>{
    return this._httpClient.get<DailyEvent[]>(`${this.baseURL}/dailyevent/getdailyevent?id=${id}`);

  }

  //--------------------------------------------------------------------------------------------

  public setUsername(username: string) {
    this.username = username;
  }

  public setIdName(id: string) {
    this.user_id = id;
  }

  public setisLogged(newState: boolean): void {
    this.isLogged.next(newState);
  }

  public getisLogged(): boolean {
    return this.isLogged.value;
  }

}
