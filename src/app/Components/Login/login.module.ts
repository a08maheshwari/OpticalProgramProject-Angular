import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent} from './login.Component';
import { loginRoute } from "./login.route";
import { HttpModule } from '@angular/http';
// Service Start
import { AppSettingsService  } from "../../Service/App-settings.Service";
import { AuthenticationService } from '../../Service/Authentication.Service';
import { LanguageChange } from '../../shared/languageChange';
// Service End
import { TranslateModule, TranslateLoader, } from "@ngx-translate/core";
import { TranslateHttpLoader} from "@ngx-translate/http-loader";
import { FormsModule , ReactiveFormsModule  }   from '@angular/forms';
import { HttpClient, HttpClientModule } from "@angular/common/http";


export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    HttpModule,
    loginRoute,
    FormsModule,
    ReactiveFormsModule ,
    CommonModule,
    TranslateModule.forChild({    })
  ],
    providers : [
      AuthenticationService,
      AppSettingsService,
      LanguageChange
    ]
})

export class loginModule { 
}
