import {ModuleWithProviders} from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import {PatientComponent} from './Components/Patient/patient.Component';
import {PatientListingComponent} from './Components/PatientListing/patientListing.Component';
import {PatientContactLensComponent} from './Components/PatientContactLens/patientContactLens.Component';


const appRoutes: Routes = [
    { 
         path: 'login', 
         loadChildren : './Components/Login/login.module#loginModule',
    },
    {
        path : 'agenda',
        loadChildren :  './Components/agenda/agenda.module#agendaModule'
    },
    {
        path : 'patient',
        loadChildren :  './Components/patient/patient.module#patientModule'
    },
    {
        path : 'patient/:id',
        loadChildren :  './Components/patient/patient.module#patientModule'
    },
    {
        path : 'patientListing',
        loadChildren :  './Components/patientlisting/patientlisting.module#patientListingModule'
    },   
    {
        path : 'contactlens',
        loadChildren :  './Components/patientContactLens/patientContactLens.module#PatientContLensModule'
    },
    {
         path : 'users',
         loadChildren :  './Components/users/users.module#userModule'
    }

    // { path: 'register', component: RegisterComponent },
    // // otherwise redirect to home
    //  { path: '**', redirectTo: '' }
];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);