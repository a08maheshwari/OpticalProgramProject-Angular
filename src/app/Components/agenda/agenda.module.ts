import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent} from './agenda.Component';
import { agendaRoute } from "./agenda.route";
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { CalendarModule } from "ap-angular2-fullcalendar";
import 'jquery';
import 'moment';
import 'fullcalendar';
// Service Start
import { AppSettingsService  } from "../../Service/App-settings.Service";
import { agendaService } from '../../Service/agenda.service';
import { commonService } from '../../Service/common.service';
import { LanguageChange } from '../../shared/languageChange';
// Service End
import { TranslateModule, TranslateLoader, } from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { FormsModule , ReactiveFormsModule }   from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { agendaSettingComponent } from '../../Components/agenda/agendaSettings.component'; 
import {  
  AutoCompleteModule,
  ButtonModule,
  InputMaskModule,
  DropdownModule,
  ScheduleModule, 
  DialogModule ,
  CalendarModule,
  CheckboxModule,
  ConfirmDialogModule,
  GrowlModule
} from 'primeng/primeng';

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    AgendaComponent,
    agendaSettingComponent
  ],
  imports: [
    AutoCompleteModule,
    ButtonModule,
    InputMaskModule,
    DialogModule,
    DropdownModule,
    ScheduleModule,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    GrowlModule,
    HttpModule,
    agendaRoute,
    FormsModule,
    ReactiveFormsModule ,
    CommonModule,
    TranslateModule.forChild({    })
  ],
    providers : [
      agendaService,
      commonService,
      AppSettingsService,
      LanguageChange
      
    ]
})

export class agendaModule { 

}
