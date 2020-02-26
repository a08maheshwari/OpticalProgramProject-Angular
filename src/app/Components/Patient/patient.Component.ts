import { LanguageID } from '../../shared/enums';
import { debug } from 'util';
import { any } from 'codelyzer/util/function';
import { debounce } from 'rxjs/operator/debounce';
import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router,Params } from '@angular/router';
import { PatientModel } from "../../Models/Patients";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LanguageChange } from "../../shared/languageChange";
import { PatientService } from '../../Service/Patient.Service'
import { SelectItem ,ConfirmationService} from 'primeng/primeng';
//import {PatientListingComponent} from '../PatientListing/patientListing.Component';
//import {CalendarModule} from 'primeng/primeng';



@Component({
    //moduleId: module.id,
     templateUrl: './patient.Component.html',
  //   providers:[PatientListingComponent]
})

export class PatientComponent implements OnInit {
 //   @ViewChild('patientViewChild')patientViewChild:PatientListingComponent;
   
    loading = false;
    returnUrl: string;
    age:number;
    preferances: SelectItem[];
    patientModel = new PatientModel();
 
   
    //for form submission and validation
  public rForm: FormGroup;
  PatientData:any; // A property for our submitted form


   
    emailRegex:any=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
     numberRegex:any= /^[0-9]*$/;   //only for numbers
   // model: PatientModel;
   
   // public form: FormGroup;
    messages: any =[];
    constructor(
        private builder: FormBuilder,
        private languageChange : LanguageChange,
        private patientService : PatientService,
        private activatedRoute: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private router: Router
    )  
 
    { 

    this.rForm = builder.group({
    'PatientID' : [null],
    'MasterUserID' : [null],
    'FileNo' : [null],
    'TitleID' : [null],
    'FirstName':[null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
    'MiddleName':[null],
    'LastName':[null,Validators.compose([ Validators.required ])],
    'DateOfBirth':[null,Validators.compose([ Validators.required])],
    'Gender':[null,Validators.compose([ Validators.required ])],
    'Medicare':[null],
    'CityId':[null],
    'PostalCode':[null],
    'StateID' : [null],
    'CountryID' : [null,Validators.compose([Validators.required])],
    'Extension':[null],
    'HomePhone':[null,Validators.compose([ Validators.required ])],
    'WorkPhone':[null],
    'CellPhone':[null ,Validators.compose([ Validators.required ]) ],
    'Email':[null ,Validators.compose([ Validators.required, Validators.pattern(this.emailRegex) ]) ],
    'PreferenceID':[null],
    'Optometrist':[null],
    'Ophthalmologist':[null],
    'Optician':[null],
    'Assistant':[null],
    'ThirdPartyBalance':[null],
    'PatientBalance':[null],
    'Insurer':[null],
    'PlanNumber':[null],
    'Address':[null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(200)])],
    'SpokenLanguage':[null,Validators.compose([ Validators.required ])],
    'DoNotRecall':[null],
    'Occupation':[null],
    'OtherDetail':[null],
    'CreatedDate':[null],
    'age':[null],
      'validate' : ''
    });

 }

    addPatient(PatientData, isValid) {
        if (isValid) {
            this.messages = [];
            this.patientService.SavePatientData(this.patientModel)
                .subscribe(                   
                data => {  
                   
                    this.router.navigate(['/patientListing']);
                },

            )
            //this.patientViewChild.PatientListing();
           
        }
    };

    
    ngOnInit() {
        this.Initializepatient ();
      
     
             }

    patient() {
        this.loading = true; 
    }
     state() {
        this.loading = true; 
    }

   
    getLanguage() {
        this.patientService.GetlanguageDropdown().subscribe(
            data => {
                this.patientModel._ListLanguage = data;
            },
            error => {
                this.loading = false;
            }
        );
    }
    onSelect(countryid) {
        let languageid: number = parseInt(localStorage.getItem("languageID"));
        this.messages = [];
        this.patientService.getState(countryid, languageid).subscribe(
            data => {
                this.patientModel._ListProvince = data;
            });
    }

    onSelectState(stateId) {
        let languageid: number = parseInt(localStorage.getItem("languageID"));
        this.messages = [];
        this.patientService.getCity(stateId, languageid).subscribe(
            data => {
                this.patientModel._ListCity = data;
                //  this.cityModel=JSON.parse(data['_body']);

            });
    }

    Initializepatient() {
        this.activatedRoute.params.subscribe((params: Params) => {
            let Patientid : any = params['id'];
            if(Patientid == undefined)
                {
                    Patientid=0;
                };
            this.patientService.Initializepatients(Patientid).subscribe(
                data => {
                    this.patientModel = data;
                    if (this.patientModel.PatientID != 0) {
                     
                        let dateString = (this.patientModel.CreatedDate)
                        let newDate = new Date(dateString);
                        this.patientModel.CreatedDate = newDate;

                        let dob = (this.patientModel.DateOfBirth)
                        let newDob = new Date(dob)
                        this.patientModel.DateOfBirth = newDob;
                        var currentDate=new Date(Date.now())
                        this.patientModel.age=currentDate.getFullYear()-newDob.getFullYear();
                    }
                    else
                     
                        {
                            this.patientModel.CreatedDate =  new Date(this.patientModel.CreatedDate);
                            this.getLanguage();    
                        }
                       
                  //  this.router.navigate(['/patientListing']);
                }
            );
            
        });
       
    }

 calculateAge(dob) {
    var currentDate=new Date(Date.now())
        this.patientModel.age=currentDate.getFullYear()-dob.getFullYear();
}

}


