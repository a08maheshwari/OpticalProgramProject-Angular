
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientContactLensComponent} from './patientContactLens.Component';
import { contLensRoute } from "./patientContactLens.route";
import { HttpModule } from '@angular/http';

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
    PatientContactLensComponent
  ],
  imports: [
    HttpModule,
    contLensRoute,
    FormsModule,
    ReactiveFormsModule ,
    CommonModule,
    InputMaskModule,
    DropdownModule,
    CalendarModule,
    TranslateModule.forChild({    })
  ],
    providers : [
      LanguageChange
    ]
})

export class PatientContLensModule { 

}
