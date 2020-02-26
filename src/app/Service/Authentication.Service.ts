import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Global } from '../shared/global';
import { AppSettingsService } from '../Service/App-settings.Service';
import { RequestStatus } from '../shared/enums'
import { UserLogin } from "../Models/Users";
@Injectable()
export class AuthenticationService {
    constructor(private settings: AppSettingsService,private http: Http) { }
    login(loginDetails: UserLogin) {
        
       let url= this.settings.getBaseUrl() + Global.API_Login_Auth_Url;
            return this.http.request(url,{
                body:loginDetails,
                method:"POST",headers: new Headers({
                "Content-Type": "application/json"
            })})
            .map((response: Response) => {
                let loginResponse = response.json();                
                localStorage.setItem('authenticationtoken', loginResponse.Token);
                localStorage.setItem('plainRolesText', loginResponse.Roles);
                localStorage.setItem('userRoles', loginResponse.RolesTicket);
                localStorage.setItem('userId', loginResponse.UserId);
                return loginResponse;
            }).catch((error: any) => {
                if (error.status === RequestStatus.InternalError) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === RequestStatus.NotFound) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === RequestStatus.NotAcceptable) {
                    return Observable.throw(new Error(error.status));
                }
                else if (error.status === RequestStatus.Confilct) {
                    return Observable.throw(new Error(error.status));
                }
                else{
                    return Observable.throw(new Error(error.status));
                }
            });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('authenticationtoken');
        localStorage.removeItem('plainRolesText');
        localStorage.removeItem('userRoles');
        localStorage.removeItem('userId');
    }
}