import { patientModule } from '../Components/Patient/patient.module';
import { debug } from 'util';
import { Injectable, state } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Global } from '../shared/global';
import { AppSettingsService } from '../Service/App-settings.Service';
import { RequestStatus } from '../shared/enums'
import { PatientModel } from "../Models/Patients";
import { PatientFilterModel } from "../Models/Patients";
@Injectable()
export class PatientService {
    constructor(private settings: AppSettingsService, private http: Http) { }
    

    // function for getting language dropdown 
    GetlanguageDropdown() {
        let url = this.settings.getBaseUrl() + Global.API_Common_GetLanguage;
        return this.http.request(url, {

            body: "",
            method: "GET", headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID" : localStorage.getItem("languageID")
            })
        })
            .map((responce: Response) => {
                debugger;
                return responce.json();
            });

    }


    getState(countryid, languageId) {
        let url = this.settings.getBaseUrl() + Global.API_Common + "?countryid=" + countryid + "&languageId=" + languageId;
        return this.http.request(url, {

            body: countryid + languageId,
            method: "GET", headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID" : localStorage.getItem("languageID")
            })
        })
            .map((responce: Response) => {
                return responce.json();
            });

    }

    getCity(stateId, languageId) {
        let url = this.settings.getBaseUrl() + Global.API_CommonGetCity + "?stateId=" + stateId + "&languageId=" + languageId;
        return this.http.request(url, {

            body: stateId + languageId,
            method: "GET", headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID" : localStorage.getItem("languageID")
            })
        })
            .map((responce: Response) => {
                return responce.json();
            });

    }
    SavePatientData(patientDetails: PatientModel) {
        let url = this.settings.getBaseUrl() + Global.API_Patient_SavePatientData;
        return this.http.request(url, {
            body: patientDetails,
            method: "POST", headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID" : localStorage.getItem("languageID")
            })
        })
            .map((response: Response) => {
                let patientResponse = response.json();

                return patientResponse;
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

    //funtion for patient listing
    GetPatientListing(patientFilterModelDetails: PatientFilterModel) {
        let url = this.settings.getBaseUrl() + Global.API_Patient_GetPatientListing;
        return this.http.request(url, {
            body: patientFilterModelDetails,
            method: "POST", headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID" : localStorage.getItem("languageID")
            })
        })
            .map((response: Response) => {
      
                let patientListingResponse = response.json();

                return patientListingResponse;
            });
    }

    GetPatientDetails(patientModule: PatientModel) {
   
        let url = this.settings.getBaseUrl() + Global.API_Patient_GetPatientDetails;
        return this.http.request(url, {
            //  body:patientFilterModelDetails,
            method: "POST", headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID" : localStorage.getItem("languageID")
            })
        })
            .map((response: Response) => {
     
                let patientListingResponse = response.json();

                return patientListingResponse;
            });
    }


    Initializepatients(patientId) {
        let url = this.settings.getBaseUrl() + Global.API_Patient + "?patientId=" + patientId;
        return this.http.request(url, {
               method: "GET",
               headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID" : localStorage.getItem("languageID")
            })})
            .map((responce: Response) => {
      
                return responce.json();
            });

    }

    DeletePatient(patientId)
    {
        var userID = localStorage.getItem("userId");
         ;
        let url = this.settings.getBaseUrl() + Global.API_Patient_DeletePatient + "?patientId=" + patientId+ "&userID=" + userID;
        return this.http.request(url, {
               method: "GET",
               headers: new Headers({
                "Content-Type": "application/json",
                "LanguageID" : localStorage.getItem("languageID")
            })})
            .map((responce: Response) => {

                return responce.json();
            });
    }



}