import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ApiPruebaComponent } from './api-prueba/api-prueba.component';
import{ApiUserService} from './api-user.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { FullCalendarModule } from '@fullcalendar/angular'; // Importa el módulo de FullCalendar
import { ScheduleComponent } from './schedule/schedule.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    ApiPruebaComponent,
    ScheduleComponent
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    BrowserModule
    
    

  ],
  providers: [ApiUserService, HttpClient, provideHttpClient(), HomeComponent, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
