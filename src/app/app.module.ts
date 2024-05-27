import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PadreComponent } from './padre/padre.component';
import { ContadorComponent } from './contador/contador.component';
import { ButtonComponent } from './button/button.component';
import { HijoComponent } from './hijo/hijo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CabezeraHomeComponent } from './cabezera-home/cabezera-home.component';
import { AboutComponent } from './about/about.component';
import { EstiloEnfasisDirective } from './estilo-enfasis.directive';
import { MayusculasPipe } from './mayusculas.pipe';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ApiPruebaComponent } from './api-prueba/api-prueba.component';
import{ApiUserService} from './api-user.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';

import { FullCalendarModule } from '@fullcalendar/angular'; // Importa el módulo de FullCalendar
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    PadreComponent,
    ContadorComponent,
    ButtonComponent,
    HijoComponent,
    HeaderComponent,
    CabezeraHomeComponent,
    AboutComponent,
    EstiloEnfasisDirective,
    MayusculasPipe,
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
    FullCalendarModule, // Agrega FullCalendarModule a los imports
    BrowserModule
    

  ],
  providers: [ApiUserService, HttpClient, provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
