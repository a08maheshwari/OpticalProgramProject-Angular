import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Global } from '../shared/global';
import { AppSettingsService } from '../Service/App-settings.Service';
import { RequestStatus } from '../shared/enums'

@Injectable()

export class commonService {
    constructor(private settings: AppSettingsService, private http: Http) { }

    GetProviders() {
        let url = this.settings.getBaseUrl() + Global.API_Common_GetProviderByMaster;
        return this.http.request(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                return response.json();
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
                else {
                    return Observable.throw(new Error(error.status));
                }
            });
    }

    convertTimeToDate(time: string) {
        let newTime: any[] = time.split(":");
        var currentDate = new Date();
        if (newTime.length == 3) {
            currentDate.setHours(newTime[0]);
            currentDate.setMinutes(newTime[1]);
            currentDate.setSeconds(newTime[2]);
        }
        return currentDate;
    }

    convertDateToTime(date: Date) {
        if (date == undefined) {
            date = new Date();
        }
        let Hours: string;
        let Minutes: string;
        if (date.getHours() < 10) {
            Hours = "0" + date.getHours();
        }
        else {
            Hours = date.getHours().toString();
        }
        if (date.getMinutes() < 10) {
            Minutes = "0" + date.getMinutes();
        }
        else {
            Minutes = date.getMinutes().toString();
        }
        let time = Hours + ":" + Minutes + ":00";
        return time;
    }



}