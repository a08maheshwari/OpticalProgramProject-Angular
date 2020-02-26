import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Global } from '../shared/global';
import { AppSettingsService } from '../Service/App-settings.Service';
import { RequestStatus } from '../shared/enums'
import { CalendarModel, agendaSettingsModel, patientSlotModel, AgendaPatientModel } from "../Models/calendar";
import { commonService } from './common.service';

@Injectable()

export class agendaService {
    constructor(
        private settings: AppSettingsService,
        private http: Http,
        private commonService: commonService
    ) { }
    InitlizeAgenda(providerID: number) {
        let url = this.settings.getBaseUrl() + Global.API_Agenda_InitlizeAgenda + "?id=" + providerID;
        return this.http.request(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID": localStorage.getItem("languageID"),
                "Timezone" : new Date().toString().split('(')[1].replace(')','')
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




    updateScheduleSettings(agendaSettings: agendaSettingsModel) {
        let url = this.settings.getBaseUrl() + Global.API_Agenda_UpdateSettings;
        agendaSettings.userID = localStorage.getItem("userId");
        agendaSettings.startTime = this.commonService.convertDateToTime(agendaSettings.minTime);
        agendaSettings.endTime = this.commonService.convertDateToTime(agendaSettings.maxTime);
        agendaSettings.slotDuration = this.commonService.convertDateToTime(agendaSettings.slotTime);
        return this.http.request(url, {
            method: "POST",
            body: JSON.stringify(agendaSettings),
            headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID": localStorage.getItem("languageID"),
                "Timezone" : new Date().toString().split('(')[1].replace(')','')
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



    initCreateAppointment(AppointmentID: number = 0) {
        let url = this.settings.getBaseUrl() + Global.API_Agenda_InitCreateEncounter;
        return this.http.request(url, {
            method: "POST",
            body: AppointmentID,
            headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID": localStorage.getItem("languageID"),
                "Timezone" : new Date().toString().split('(')[1].replace(')','')
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


    patientDetailByID(PatientID: number) {
        let url = this.settings.getBaseUrl() + Global.API_Agenda_PatientDetail;
        return this.http.request(url, {
            method: "POST",
            body: PatientID,
            headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID": localStorage.getItem("languageID"),
                "Timezone" : new Date().toString().split('(')[1].replace(')','')
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

    createSchedule(schedule: patientSlotModel) {
        localStorage.setItem("Timezone", new Date().toString().split('(')[1].replace(')','')) 
        let url = this.settings.getBaseUrl() + Global.API_Agenda_CreateEncounter;
        schedule.AppStartTime = new Date(schedule.AppDate.setHours(schedule.AppStartTime.getHours(), schedule.AppStartTime.getMinutes()));
        schedule.AppEndTime = new Date(schedule.AppDate.setHours(schedule.AppEndTime.getHours(), schedule.AppEndTime.getMinutes()));
        schedule.slotDate = schedule.AppDate.toDateString();
        schedule.slotStartTime = this.commonService.convertDateToTime(schedule.AppStartTime);
        schedule.slotEndTime = this.commonService.convertDateToTime(schedule.AppEndTime);
        
        return this.http.request(url, {
            method: "POST",
            body: schedule,
            headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID": localStorage.getItem("languageID"),
                "Timezone" : localStorage.getItem("Timezone")
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
            });;
    }

    initlizePatient() {
        let url = this.settings.getBaseUrl() + Global.API_Agenda_InitlizePatient;
        return this.http.request(url, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID": localStorage.getItem("languageID"),
                "Timezone" : new Date().toString().split('(')[1].replace(')','')
            })
        })
            .map((response: Response) => {
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
            });;
    }


    SavePatient(patient: AgendaPatientModel) {
        let url = this.settings.getBaseUrl() + Global.API_Agenda_SavePatient;
        patient.UserID = localStorage.getItem("userId");
        return this.http.request(url, {
            method: "POST",
            body: patient,
            headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID": localStorage.getItem("languageID"),
                "Timezone" : new Date().toString().split('(')[1].replace(')','')
            })
        })
            .map((response: Response) => {
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
            });;
    }
}