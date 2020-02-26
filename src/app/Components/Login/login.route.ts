import{ ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { LoginComponent } from './login.Component';

const Login_Router : Routes = 
[
    { 
        path: '', 
        component: LoginComponent 
    }
];

export const loginRoute = RouterModule.forChild(Login_Router);