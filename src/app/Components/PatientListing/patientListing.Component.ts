import { debug } from 'util';
import { any } from 'codelyzer/util/function';
import { debounce } from 'rxjs/operator/debounce';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Route, Router } from '@angular/router';
import { PatientModel } from "../../Models/Patients";
import { PatientFilterModel } from "../../Models/Patients";
import { FilterModel } from "../../Models/Patients";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LanguageChange } from "../../shared/languageChange";
import { PatientService } from '../../Service/Patient.Service'
import { SelectItem ,ConfirmationService} from 'primeng/primeng';
import { DatePipe } from '@angular/common';

//import {CalendarModule} from 'primeng/primeng';



@Component({

    templateUrl: './patientListing.Component.html',
//  selector: 'loginForm',
 
//   providers: [ROUTER_PROVIDERS]

})

export class PatientListingComponent implements OnInit, AfterViewInit {
    loading = false;
    returnUrl: string;
    paitientListing: any;
    public sForm: FormGroup;
    preferances: SelectItem[];
    patientModel = new PatientModel();
    totalRecords: number = 0;
    Rows: any = 5;
    // patientFilterModel :PatientFilterModel;
    patientFilterModel = new PatientFilterModel();
    FilterModelpatient = new FilterModel();
    // public form: FormGroup;
    messages: any = [];
    constructor(
        private builder: FormBuilder,
        private languageChange: LanguageChange,
        private patientService: PatientService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {

        this.sForm = builder.group({
            'patientID': [null],
            'Name': [null],
            'FileNo': [null],
            'CellPhone': [null],
            'HomePhone': [null],
            'DateOfBirth': [null],
            'PageSize': [null],
            'CurrentPage': [null],
            'LanguageID': [null]
        });
    }

    ngOnInit() {
        
    }
ngAfterViewInit(){
    this.PatientListing();
}

    PatientListing() {
    
        this.messages = [];
        this.totalRecords = 10;
        this.Rows = 5;
        this.patientFilterModel.PageSize = 10;
        this.patientFilterModel.RowNumber = 0;
       
        this.patientModel.DateOfBirth =new  Date(this.patientModel.DateOfBirth)
        this.patientService.GetPatientListing(this.patientFilterModel).subscribe(
            data => {
 
                this.patientModel = data;
                this.paitientListing = this.patientModel._ListPatientListing;
                this.totalRecords = data.TotalRecords;
            },
            error => {
                this.loading = false;
            }
        );
    }

    resetSearch() {
        this.patientFilterModel.Name = '';
        this.patientFilterModel.CellPhone = '';
        this.patientFilterModel.HomePhone = '';
        this.patientFilterModel.DateOfBirth = '';
        this.patientFilterModel.FileNo = 0;


    }

 


    loadPatientListing(event) {
        this.patientFilterModel.PageSize = event.rows;
        this.patientFilterModel.RowNumber = event.first;
        this.patientFilterModel.OrderColumn = event.sortField;
      
        if (event.sortOrder == 1) {
            this.patientFilterModel.OrderBy = "asc";
        }
        else {
            this.patientFilterModel.OrderBy = "desc";
        }
       
        this.patientService.GetPatientListing(this.patientFilterModel).subscribe(
            data => {
                this.patientModel = data;
                this.paitientListing = this.patientModel._ListPatientListing;
                this.totalRecords = data.TotalRecords;
            },
            error => {
                this.loading = false;
            }
        );

    }


    editPatient(PatientID)
    {
        this.router.navigate(['/patient', PatientID]);
}

openAddPatientForm()
{
    this.router.navigate(['/patient']);
}
  

deletePatient(patientId)
    {
   
        this.confirmationService.confirm({
                  message: 'Do you want to delete this record?',
                  header: 'Delete Confirmation',
                  icon: 'fa fa-trash',
                  accept: () => {
        this.patientService.DeletePatient(patientId).subscribe(
            data => {
                this.PatientListing(); 
            },
          
            error => {
                this.loading = false;
            }
           
        );
     //  this.PatientListing(); 
    }
})
    };

}


