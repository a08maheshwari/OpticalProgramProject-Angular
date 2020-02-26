import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators , FormControl } from '@angular/forms';
import {
  patientSlotModel,
  CalendarModel,
  agendaSettingsModel,
  AgendaPatientModel
} from '../../Models/calendar'
import { SelectItem, ConfirmationService, Message } from 'primeng/primeng';
import { LanguageChange } from "../../shared/languageChange";
import { agendaService } from "../../Service/agenda.service";
import { commonService } from "../../Service/common.service";
import { CustomValidation  } from "../../shared/customValidations"


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})

export class AgendaComponent {
  calendarModel = new CalendarModel();
  slotModel = new patientSlotModel();
  updateSlotModel =  new patientSlotModel();
  agendaSettings = new agendaSettingsModel();
  agendaPatient = new AgendaPatientModel();
  providerID: number;
  value: Date;
  currentDate: Date = new Date();
  patients: SelectItem[];
  providers: SelectItem[];
  msgs: Message[] = [];  
  views: any;
  PatientModal: boolean = false;
  display: boolean = false;
  showSettings: boolean = false;
  UpdateEncounter: boolean = false;
  Title: string = "";
  settingsTitle: string = "Schedule settings";
  headerConfig: any;
  updateAppointmentForm : FormGroup;
  AddAppointmentForm : FormGroup;
  AddPatientForm :  FormGroup;
  CalendarOptions: Object = {
    views: {
      month: {
        titleFormat: 'MMMM YYYY'
      },
      week: {
        titleFormat: " MMMM D YYYY"
      },
      day: {
        titleFormat: 'D MMM, YYYY'
      }
    }
  }

  constructor
    (
    private languageChange: LanguageChange,
    private agendaService: agendaService,
    private commonService: commonService,
    private confirmationService: ConfirmationService
    ) {
      this.getProviderLists();

      this.updateAppointmentForm =  new FormGroup({
        'PatientID': new FormControl('',Validators.required),
        'DateOfBirth' : new FormControl(),
        'ExamTypeID' : new FormControl('', Validators.required),
        'StatusID' : new FormControl('',Validators.required),
        'AppDate' : new FormControl('',  [Validators.required,CustomValidation.checkValidDate]),
        'AppStartTime' : new FormControl('', [Validators.required, CustomValidation.validAppDuration]),
        'AppEndTime' : new FormControl('',  [Validators.required, CustomValidation.validAppDuration]),
        'Description' : new FormControl()    
      });

      this.AddAppointmentForm  =  new FormGroup({
        'PatientID' : new FormControl(0,Validators.required),
        'ExamTypeID' : new FormControl(0,Validators.required),
        'AppDate' : new FormControl('', [Validators.required,CustomValidation.checkValidDate]),
        'AppStartTime' : new FormControl('', [Validators.required, CustomValidation.validAppDuration]),
        'AppEndTime' : new FormControl('', [Validators.required, CustomValidation.validAppDuration]),
        'Description' : new FormControl(),
        'CellPhone' : new FormControl(),
        'HomePhone' : new FormControl(),
        'DateOfBirth' : new FormControl()
      });

      this.AddPatientForm  =  new FormGroup({
        'TitleID' : new FormControl(null,Validators.required),
        'FirstName' : new FormControl(null,Validators.required),
        'MiddleName' : new FormControl(),
        'LastName' : new FormControl(null, Validators.required),
        'Medicare' : new FormControl(),
        'DateOfBirth' : new FormControl(null,Validators.required),
        'GenderID' : new FormControl(null,Validators.required),
        'LanguageID' : new FormControl(null,Validators.required),
        'HomePhone' : new FormControl(),
        'CellPhone' : new FormControl(null,Validators.required)
      });
  }


  ngOnInit() {
    this.headerConfig = {
      left: '',
      center: 'prev, today ,next',
      right: 'month,agendaWeek,agendaDay'
    };
  }

  handleEventClick(e) {
    if (e.date.fromNow().toLowerCase().indexOf('ago') !== -1) {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error Message', detail:'Slot not avaliable'});
      return false;
    }
    else {
      this.agendaService
        .initCreateAppointment()
        .subscribe(
        data => {
          this.slotModel = data;
          this.slotModel.PatientID = undefined;
          this.slotModel.ExamTypeID = undefined;
          this.slotModel.ToUpdateTime = false;
          this.slotModel.DateOfBirth = null;
          this.slotModel.AppDate = e.date._d;
          this.slotModel.AppStartTime = new Date(e.date._d.toUTCString());
          this.slotModel.AppEndTime = new Date(new Date(e.date._d.getTime() + e.view.timeGrid.slotDuration._data.minutes * 60000).toUTCString());
          this.display = true;
          this.Title = "Create Appointment";
        },
        Error => {

        }
        )
    }
  }

  getProviderLists() {
    this.providers = [];
    this.commonService
      .GetProviders()
      .subscribe(
      data => {
        this.providers = data;
        this.initlizeAgenda();
      },
      error => {

      }
      )

  }

  GetMinutes(Min) {
    if (parseInt(Min) > 9) {
      return Min;
    }
    else {
      return "0" + Min;
    }
  }


  initlizeAgenda() {
    if (this.providerID == undefined) {
      if (this.providers.length > 0) {
        this.providerID = this.providers[0].value;
      }
      else {
        this.calendarModel.showAllDaySlot = false;
        this.calendarModel.timeFormat = "hh:mm t";
        this.calendarModel.snapDuration = "01:00:00";
        this.calendarModel.currentLanguage = this.languageChange.currentLanguage();
        this.calendarModel.calendarEventModel = [];
        return false
      }

    }
    this.agendaService
      .InitlizeAgenda(this.providerID)
      .subscribe(
      data => {
        this.calendarModel = data;
        this.setCalendar(this.calendarModel);

      },
      error => {

      }
      )
  }

  getSettings() {
    this.display = false;
    this.showSettings = true;
  }

  setCalendar(calendarDetails: CalendarModel) {

    this.agendaSettings.minTime = this.commonService.convertTimeToDate(this.calendarModel.minTime);
    this.agendaSettings.maxTime = this.commonService.convertTimeToDate(this.calendarModel.maxTime);
    this.agendaSettings.slotTime = this.commonService.convertTimeToDate(this.calendarModel.slotDuration);

    if (this.calendarModel.disabledDays.indexOf(0) === -1) {
      this.agendaSettings.IsSunday = true;
    } else {
      this.agendaSettings.IsSunday = false;
    }
    if (this.calendarModel.disabledDays.indexOf(1) === -1) {
      this.agendaSettings.IsMonday = true;
    } else {
      this.agendaSettings.IsMonday = false;
    }
    if (this.calendarModel.disabledDays.indexOf(2) === -1) {
      this.agendaSettings.IsTuesday = true;
    } else {
      this.agendaSettings.IsTuesday = false;
    }

    if (this.calendarModel.disabledDays.indexOf(3) === -1) {
      this.agendaSettings.IsWednesday = true;
    } else {
      this.agendaSettings.IsWednesday = false;
    }

    if (this.calendarModel.disabledDays.indexOf(4) === -1) {
      this.agendaSettings.IsThursday = true;
    } else {
      this.agendaSettings.IsThursday = false;
    }

    if (this.calendarModel.disabledDays.indexOf(5) === -1) {
      this.agendaSettings.IsFriday = true;
    } else {
      this.agendaSettings.IsFriday = false;
    }

    if (this.calendarModel.disabledDays.indexOf(6) === -1) {
      this.agendaSettings.IsSaturday = true;
    } else {
      this.agendaSettings.IsSaturday = false;
    }

    this.calendarModel.showAllDaySlot = false;
    this.calendarModel.timeFormat = "hh:mm t";
    this.calendarModel.snapDuration = "01:00:00";
    this.calendarModel.currentLanguage = this.languageChange.currentLanguage();
    if (this.calendarModel.calendarEventModel == null) {
      this.calendarModel.calendarEventModel = [];
    }
  }

  saveSchedule() {
    this.agendaSettings.providerID = this.providerID;
    this.agendaService
      .updateScheduleSettings(this.agendaSettings)
      .subscribe(
      data => {
        this.calendarModel = data;
        this.setCalendar(this.calendarModel);
        this.showSettings = false;
      },
      Error => {

      }
      )
  }

  getPatientDetailByID() {
    this.agendaService
      .patientDetailByID(this.slotModel.PatientID)
      .subscribe(
      data => {
        this.slotModel.DateOfBirth = new Date(data.DateOfBirth);
        this.slotModel.CellPhone = data.CellPhone;
        this.slotModel.HomePhone = data.HomePhone;
      },
      Error => {

      }
      )
  }

  AddEncounter() {
    debugger;
    this.slotModel.ProviderID = this.providerID;
    this.slotModel.ToDelete = false;
    this.slotModel.ToUpdateTime = false;
    this.slotModel.UserID = localStorage.getItem("userId");
    this.agendaService
      .createSchedule(this.slotModel)
      .subscribe(
      data => {
        this.calendarModel.calendarEventModel = data;
        this.display = false;
        this.UpdateEncounter =  false;
      },
      Error => {

      }
      )
  }

  EventDetails(e) {
    debugger;
    this.agendaService
      .initCreateAppointment(e.calEvent.id)
      .subscribe(
      data => {
        this.updateSlotModel = data;
        this.updateSlotModel.ToUpdateTime = false;
        this.updateSlotModel.AppointmentID = e.calEvent.id;
        this.updateSlotModel.AppStartTime = new Date(this.updateSlotModel.slotStartTime);
        this.updateSlotModel.AppEndTime = new Date(this.updateSlotModel.slotEndTime);
        this.updateSlotModel.AppDate = data.AppStartTime;
        this.updateSlotModel.DateOfBirth = new Date(data.DateOfBirth);
        this.UpdateEncounter = true;
      },
      Error => {

      }
      )
  }


  RenderDetails(event, element, view) {
    element.qtip({
      content: {
        text: "<strong>Professional:</strong> " + event.Professional + "<br/><strong>Start:</strong> " + event.start.format("DD/MM/YYYY hh:mm T") + "<br/><strong>End:</strong> " + event.end.format("DD/MM/YYYY hh:mm T") + "<br/><b>Exam:</b> " + event.ExamType + "<br/><strong>Status:</strong> " + event.Status + "<br/><strong>Description:</strong> " + event.Description,
        title: '<strong>' + event.title + '</strong>', button: true
        //},
        // position: {
        //   target: 'mouse',
        //   adjust: { mouse: false },
        //   viewport: $(window),
      },
      show: {
        solo: true
      },
      hide: {
        fixed: true,
        delay: 300
      }

    });

  }

  DeleteEncounter() {
    this.UpdateEncounter = false;

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.updateSlotModel.ToUpdateTime = false;
        this.updateSlotModel.ProviderID = this.providerID;
        this.updateSlotModel.ToDelete = true;
        this.updateSlotModel.UserID = localStorage.getItem("userId");
        this.agendaService
          .createSchedule(this.updateSlotModel)
          .subscribe(
          data => {
            this.calendarModel.calendarEventModel = data;
            this.UpdateEncounter = false;
          },
          Error => {

          }
          )
      }
    });

  }

  updateResize(e) {
    this.updateSlotModel.AppointmentID = e.event.id;
    this.updateSlotModel.AppStartTime = e.event.start._d;
    this.updateSlotModel.AppEndTime = e.event.end._d;
    this.updateEncounter();
  }


  updateDrop(e) {
    this.updateSlotModel.AppointmentID = e.event.id;
    this.updateSlotModel.AppStartTime = e.event.start._d;
    this.updateSlotModel.AppEndTime = e.event.end._d;
    if(e.event.start._d  <  new Date()){
      this.initlizeAgenda();
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error Message', detail:'Slot not avaliable'});
      return false;
    }
    this.updateEncounter();
  }



  updateEncounter() {
    
    this.updateSlotModel.ToUpdateTime = true;
    this.updateSlotModel.AppDate = this.updateSlotModel.AppStartTime;
    this.updateSlotModel.ToDelete = false;
    this.updateSlotModel.UserID = localStorage.getItem("userId");
    this.agendaService
      .createSchedule(this.updateSlotModel)
      .subscribe(
      data => {
        this.calendarModel.calendarEventModel = data;
        this.UpdateEncounter = false;
      },
      Error => {

      }
      )
  }

  modifyEncounter() {
    debugger;
    this.updateSlotModel.ProviderID = this.providerID;
    this.updateSlotModel.ToDelete = false;
    this.updateSlotModel.ToUpdateTime = false;
    this.updateSlotModel.UserID = localStorage.getItem("userId");
    this.agendaService
      .createSchedule(this.updateSlotModel)
      .subscribe(
      data => {
        this.calendarModel.calendarEventModel = data;
        this.display = false;
        this.UpdateEncounter =  false;
      },
      Error => {

      }
      )
  }

  initPatientModal() {
    this.agendaService
      .initlizePatient()
      .subscribe(
      data => {
        this.agendaPatient = data;
        this.PatientModal = true;
        this.display = false;
      },
      Error => {

      }
      )
  }

  addPatient() {

    this.agendaService
      .SavePatient(this.agendaPatient)
      .subscribe(
      data => {
        this.slotModel.listPatients = data;
        this.PatientModal = false;
        this.display = true;

      },
      Error => {

      }
      )
  }
}
