import { debug } from 'util';
import { any } from 'codelyzer/util/function';
import { debounce } from 'rxjs/operator/debounce';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ContactLensModel } from "../../Models/contactLens";
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LanguageChange } from "../../shared/languageChange";
// import { PatientService } from '../../Service/Patient.Service'
// import { SelectItem } from 'primeng/primeng';


@Component({
    //moduleId: module.id,
     templateUrl: './patientContactLens.Component.html'
})

export class PatientContactLensComponent implements OnInit {
    loading = false;
    returnUrl: string;
    //preferances:SelectItem[];
    contactLensModel =  new ContactLensModel();
   
    //for form submission and validation
    public patientContactLensForm: FormGroup;
    messages: any =[];
    constructor(
        private builder: FormBuilder,
        private languageChange : LanguageChange,
     
    )   
    { 
        this.patientContactLensForm = builder.group({
            'Company' : [null],
            'Prescription' : [null],
            'Date' : [null],
            'Professional' : [null],
            'LabInvoice':[null],
             'Patient': [null],
             'Exam':[null],
             'LabInvoiceNo': [null],
             'TrayNumber': [null],
             'Rx_OD_Sphere': [null],
             'Rx_OD_Cylinder': [null],
             'Rx_OD_Axis': [null],
             'Rx_OD_Addition': [null],
             'Rx_OD_Segh': [null],
             'Rx_OD_OZ': [null],

              'validate' : ''
        });

    }

    addContactLens(PatientData,isValid) {
        if(isValid){
        this.messages=[];
        //this.patientService.SavePatientData(this.patientModel)
        // .subscribe(
        //       data => {
                
        //       },
        // )
        }
    };

    
    ngOnInit() {
        this.InitializeContactLens();
    }

 
    InitializeContactLens()
    {
        this.messages=[];
    
    }
}
