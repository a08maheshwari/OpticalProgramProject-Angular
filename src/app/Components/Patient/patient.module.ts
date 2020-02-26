
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent} from './patient.Component';
import { patientRoute } from "./patient.route";
import { HttpModule } from '@angular/http';
// Service Start
import { PatientService } from '../../Service/Patient.Service';
import { AppSettingsService  } from "../../Service/App-settings.Service";
import { LanguageChange } from '../../shared/languageChange';
// Service End
import { TranslateModule, TranslateLoader, } from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { FormsModule , ReactiveFormsModule  }   from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {  
  AutoCompleteModule,
  ButtonModule,
  InputMaskModule,
  DropdownModule,
  ScheduleModule, 
  DialogModule,
  CalendarModule
} from 'primeng/primeng';



export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    PatientComponent
  ],
  imports: [
    HttpModule,
    patientRoute,
    FormsModule,
    ReactiveFormsModule ,
    CommonModule,
    InputMaskModule,
    DropdownModule,
    CalendarModule,
    TranslateModule.forChild({    })
  ],
    providers : [
      AppSettingsService,
      LanguageChange,
      PatientService
    ]
})

export class patientModule { 

}
