import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageChange } from "./shared/languageChange";
import { CommonService } from "../../src/app/app.common";
import {CalendarModule} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  commonService=new CommonService();
  constructor(
    private languageChange : LanguageChange
    ,private route: ActivatedRoute
    ,private router: Router
    ,private zone: NgZone
  ){ }
    
  title = 'app';


  ngOnInit() {
    // reset login status
    var token = localStorage.getItem('authenticationtoken');
    if(token && token!=""){
      //TODO: Valdate Token
      //if Valid send to dashboard.
      //if not valid send to login page.
      this.commonService.menuVisibility=true;
        
     // this.router.navigate(['/agenda']);
      this.commonService.applyRoleOnMenu(); 
      
    }
    else{      
      this.router.navigate(['/login'], { relativeTo: this.route });
    }
  }
}


