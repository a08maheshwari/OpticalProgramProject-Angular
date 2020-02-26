import { SelectItem } from 'primeng/primeng';

export class CalendarModel {
  currentLanguage: string;
  showAllDaySlot: boolean;
  timeFormat: string;
  minTime: string;
  maxTime: string;
  slotDuration: string;
  snapDuration: string;
  calendarEventModel: Array<CalendarEventModel>;
  disabledDays: Array<number>;
}

export class CalendarEventModel {
  title: string;
  start: string;
  end: string;
  url: string;
  id: number;
}


export class patientSlotModel {
  AppDate: Date;
  AppointmentID: number;
  AppStartTime: Date;
  AppEndTime: Date;
  slotDate: string;
  slotStartTime: string;
  slotEndTime: string;
  PatientID: number;
  FirstName: string;
  LastName: string;
  DateOfBirth: Date;
  HomePhone: string;
  CellPhone: string;
  Description: string;
  ExamTypeID: number;
  ProviderID: number;
  ToDelete: boolean;
  ToUpdateTime: boolean;
  StatusID: number;
  UserID: string = localStorage.getItem("userId");
  listPatients: SelectItem[];
  listTestType: SelectItem[];
  listStatus: SelectItem[];
}


export class agendaSettingsModel {
  minTime: Date;
  maxTime: Date;
  slotTime: Date;
  startTime: string;
  endTime: string;
  slotDuration: string;
  IsSunday: boolean;
  IsMonday: boolean;
  IsTuesday: boolean;
  IsWednesday: boolean;
  IsThursday: boolean;
  IsFriday: boolean;
  IsSaturday: boolean;
  providerID: number;
  userID: string;
}

export class AgendaPatientModel {
  TitleID: number;
  GenderID: number;
  LanguageID: number;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  DateOfBirth: Date;
  HomePhone: string;
  CellPhone: string;
  UserID: string;
  Medicare : string;
  listTitles: SelectItem[];
  listGender: SelectItem[];
  listLanguage: SelectItem[];
}