import { Component, OnInit, NgZone } from '@angular/core';

import { LanguageChange } from "../../shared/languageChange";
import{CommonService}from "../../app.common";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector : "app-header",
    templateUrl:'./appHeader.component.html'
})

export class AppHeaderComponent {
    isEnglish : boolean =  true;
    commonService=new CommonService();
    constructor(  
      private  languageChange : LanguageChange
      ,private route: ActivatedRoute
      ,private router: Router
      ,private zone: NgZone
    ) { }
    ngOnInit() {
    
    }

    changeLang(lang){
        this.languageChange.changeLang(lang)
        this.isEnglish = lang=="en";
        
      }
    logout(){
        localStorage.setItem('authenticationtoken','');
        this.commonService.menuVisibility=true;
        // this.router.navigate(['/login']);
        this.zone.runOutsideAngular(() => {
            location.replace("http://108.168.203.227/opticalprogram/");
        });
    }
}