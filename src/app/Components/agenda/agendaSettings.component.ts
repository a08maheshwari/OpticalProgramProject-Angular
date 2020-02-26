import { Component, OnInit , Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { agendaSettingsModel } from "../../Models/calendar"
import { LanguageChange } from "../../shared/languageChange";
import { agendaService } from "../../Service/agenda.service";
import { commonService } from "../../Service/common.service";


@Component({
    templateUrl: './agendaSettings.component.html',
})

export class agendaSettingComponent {
    Title : string = "Schedule settings";
    @Input() providerID: number;   
    @Input() showSettings : boolean = false;
    agendaSettings = new agendaSettingsModel();
    
    constructor() {

    }

    ngOnInit() {

    }

}
