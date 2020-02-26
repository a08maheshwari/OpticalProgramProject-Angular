import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { LanguageID } from "./enums"

@Injectable()

export class LanguageChange{

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    localStorage.setItem("languageID",  LanguageID.English.toString() );
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    if(lang == "en"){
      localStorage.setItem("languageID",  LanguageID.English.toString() );
    }
    else if(lang == "fr"){
      localStorage.setItem("languageID",  LanguageID.French.toString() );
    }
  }

  currentLanguage (){
    return this.translate.currentLang;
  }

}