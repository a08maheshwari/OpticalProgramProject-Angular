import{ ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientContactLensComponent } from './patientContactLens.Component';
const ContLens_Router : Routes = 
[
    { 
        path: '', 
        component: PatientContactLensComponent
    }
];

export const contLensRoute = RouterModule.forChild(ContLens_Router);

