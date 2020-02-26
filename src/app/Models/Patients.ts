import { SelectItem } from 'primeng/primeng';
//import { strictEqual } from 'assert';
//import * as stream from 'stream';
export class PatientModel
 {
    PatientID : number;
    MasterUserID : number;
    FileNo : number;
    TitleID : number;
    FirstName:string;
    MiddleName:string;
    LastName:string;
    DateOfBirth:Date;
    Gender:string;
    Medicare:string;
    SpokenLanguage:string;
    Address:string;
    CityId:number;
    PostalCode:string;
    StateID : number;
    CountryID : number;
    Extension:string;
    HomePhone:string;
    WorkPhone:string;
    CellPhone:string;
    Email:string;
    PreferenceID:number;
    Optometrist:string;
    Ophthalmologist:string;
    Optician:string;
    Assistant:string;
    ThirdPartyBalance:number;
    PatientBalance:number;
    Insurer:string;
    PlanNumber:string;
    CreatedDate:Date;
    DoNotRecall:string;
    Occupation:number;
    OtherDetail:string;
    age:number;
    _ListGender : SelectItem[];
    _ListCountry : SelectItem[];
    _ListTitle :SelectItem[];
    _ListContactPreferance :SelectItem[];
    _ListOccupation :SelectItem[];
    
     _ListLanguage :SelectItem[];
      _ListCity :SelectItem[];
      _ListProvince :SelectItem[];
_ListPatientListing:any;
      
}

export class PatientFilterModel 
{
      patientID : number;
      Name:string;
      FileNo:number;
      CellPhone :string;
      HomePhone: string;
      DateOfBirth  :string;
      PageSize :number;
      CurrentPage :number;
      LanguageID :string;
      RowNumber:Number;
      OrderBy:string;
      OrderColumn:string;
     
     
      // rows :  number;
      // first : number;

}
export class FilterModel
{
      Name: string;
      FileNo: number;
      CellPhone: string;
      HomePhone: string;
      DateOfBirth: string;
}
