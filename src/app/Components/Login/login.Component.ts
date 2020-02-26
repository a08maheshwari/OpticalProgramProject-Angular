import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogin } from "../../Models/Users";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../Service/Authentication.Service'
import { TranslateService } from '@ngx-translate/core';
import { LanguageChange } from "../../shared/languageChange";

@Component({    
    templateUrl: './login.Component.html'
})

export class LoginComponent{
    loginModel= new UserLogin();
    loading = false;
    returnUrl: string;
    public form: FormGroup;
    messages: any =[];    
    constructor(
        private translate: TranslateService,
        private builder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private languageChange : LanguageChange  
        ,private ngZone: NgZone  
    )     
    { 
        //TO DO: when it's being initialized
    }
    
    ngOnInit() {
        // reset login status
        this.form = this.builder.group(
        {
            UserName: ['', Validators.required],
            Password: ['', Validators.required],
            FormErrorMessage : ''            
        }
      )
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit(formData, isValid) {
      if(isValid){
        this.messages=[];
        this.authenticationService.login(this.loginModel)
        .subscribe(
              data => {
              if(data.Result=="Success"){
                if(data.CompanyType=="Admin"){
                  if(this.returnUrl!=undefined && this.returnUrl!="")
                  {
                    this.router.navigateByUrl(this.returnUrl);
                  }
                  else{
                    this.router.navigate(['/app/dashboard'], { relativeTo: this.route }); 
                  }                
                }
                else{
                  //this.router.navigate(['/agenda']);

                  this.ngZone.runOutsideAngular(() => {
                      location.replace("http://localhost:4200/");
                  });
                  // if(this.returnUrl!=undefined && this.returnUrl!="")
                  // {
                  //   this.router.navigateByUrl(this.returnUrl);
                  // }
                  // else{
                  //   this.router.navigate(['/app/dashboard'],{relativeTo:this.route});
                  // }
                }
              }
              else{            
                this.loginModel.ErrorMessage= data.Result;
              }              
            },
            error => {
              if(error.message==500)
              {
                  this.messages.push({severity:'error', summary:'Error Message', detail:'Oops, Something went wrong. Please try again.'});
              }
              else if(error.message==0)
              {
                this.messages.push({severity:'error', summary:'Error Message', detail:'Network error, Please try again later'});
              }
              else{
                this.messages.push({severity:'error', summary:'Error Message', detail:'Some error occured, Please contact your admin'});
              }              
            }
        );
      }           
   }
}
