import{ ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient.Component';
const Patient_Router : Routes = 
[
    { 
        path: '', 
        component: PatientComponent 
    }
];

export const patientRoute = RouterModule.forChild(Patient_Router);

