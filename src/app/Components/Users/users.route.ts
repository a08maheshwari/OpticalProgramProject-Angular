import{ ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { UserComponent } from './users.component';

const User_Router : Routes = 
[
    { 
        path: '', 
        component: UserComponent 
    }
];

export const userRoute = RouterModule.forChild(User_Router);