import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { UserComponent} from './users.component';
import { userRoute } from "./users.route";

import { AppSettingsService  } from "../../Service/App-settings.Service";
import { commonService } from '../../Service/common.service';
import { LanguageChange } from '../../shared/languageChange';
import { TranslateModule, TranslateLoader, } from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { FormsModule , ReactiveFormsModule }   from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {  
    ButtonModule,
    InputMaskModule,
    DropdownModule,
    DialogModule ,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    GrowlModule,
    DataTableModule,
    SharedModule
  } from 'primeng/primeng';
  

export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
      UserComponent
  ],
  imports: [
    
    userRoute,
    HttpModule,
    FormsModule,
    ReactiveFormsModule ,
    CommonModule,
    TranslateModule.forChild({    })
  ],
    providers : [
      commonService,
      AppSettingsService,
      LanguageChange
      
    ]
})

export class userModule { 

}
