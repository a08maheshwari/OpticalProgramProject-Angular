import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { FormsModule , ReactiveFormsModule  }   from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from "./Components/shared/appHeader.component";
import { AppSidebarComponent } from "./Components/shared/appSidebar.component";
import { routing }  from './app.routing';
import { LanguageChange } from "./shared/languageChange";
import { agendaModule } from "./Components/agenda/agenda.module"
import { loginModule } from "./Components/Login/login.module"

//import {CalendarModule} from "ap-angular2-fullcalendar";
import 'jquery';
import 'moment';
import 'fullcalendar';
import { 
  AutoCompleteModule,
  ButtonModule,
  InputMaskModule,
  DialogModule, 
  DropdownModule,
  ScheduleModule,
  CalendarModule,
  CheckboxModule,
  PaginatorModule,
  ConfirmDialogModule,
  ConfirmationService,
  GrowlModule
} from 'primeng/primeng';



export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppSidebarComponent
  ],
  imports: [
    ButtonModule,
    InputMaskModule,
    BrowserModule, 
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    GrowlModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule ,
    agendaModule,
    routing ,
    HttpClientModule,
    loginModule,
    PaginatorModule,
    
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      DialogModule,
      
      ScheduleModule
  ],
  providers: [ 
    LanguageChange   ,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
