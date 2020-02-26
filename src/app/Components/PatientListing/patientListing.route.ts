import{ ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListingComponent } from './patientListing.Component';

const PatientListing_Router : Routes = 
[
    { 
        path: '', 
        component: PatientListingComponent 
    }
];

export const patientListingRoute = RouterModule.forChild(PatientListing_Router);

