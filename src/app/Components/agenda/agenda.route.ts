import{ ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { AgendaComponent } from './agenda.Component';

const Agenda_Router : Routes = 
[
    { 
        path: '', 
        component: AgendaComponent 
    }
];

export const agendaRoute = RouterModule.forChild(Agenda_Router);