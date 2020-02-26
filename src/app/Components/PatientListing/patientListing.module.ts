
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListingComponent} from './patientListing.Component';
import { patientListingRoute } from "./patientListing.route";
import { HttpModule } from '@angular/http';
//import {DataTableModule,SharedModule} from 'primeng/primeng';       //for datatables 
// Service Start
import { PatientService } from '../../Service/Patient.Service';
import { AppSettingsService  } from "../../Service/App-settings.Service";
import { LanguageChange } from '../../shared/languageChange';
// Service End
import { TranslateModule, TranslateLoader, } from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { FormsModule , ReactiveFormsModule  }   from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ActivatedRoute, Data, Router } from '@angular/router';
import {  
  AutoCompleteModule,
  ButtonModule,
  InputMaskModule,
  DropdownModule,
  ScheduleModule, 
  DialogModule,
  CalendarModule,
  DataTableModule,
  SharedModule,
  InputTextModule,
  PaginatorModule,
  ConfirmDialogModule
} from 'primeng/primeng';



export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    PatientListingComponent
  ],
  imports: [
    HttpModule,
    patientListingRoute,
    FormsModule,
    ReactiveFormsModule ,
    CommonModule,
    InputMaskModule,
    DropdownModule,
    CalendarModule,
    DataTableModule,
    PaginatorModule,
    ConfirmDialogModule,
    TranslateModule.forChild({    })
  ],
    providers : [
      AppSettingsService,
      LanguageChange,
      PatientService
    ]
})

export class patientListingModule { 

}
