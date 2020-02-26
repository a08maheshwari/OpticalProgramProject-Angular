import { SelectItem } from 'primeng/primeng';

export class UserLogin {
    UserName : string;
    Password : string;
    ErrorMessage : string;
}

export class UserModel{
    UserID : number;
    Name  : string;
    FirstName : string;
    MiddleName : string;
    LastName : string;
    Password : string;
    ConfirmPassword : string;
    IsProfessional : boolean ;
    minTime: Date;
    maxTime: Date;
    slotTime: Date;
    Position : string;
    IsSunday : boolean;
    IsMonday : boolean;
    IsTuesday : boolean;
    IsWednesday : boolean;
    IsThursday : boolean;
    IsFriday : boolean;
    IsSaturday : boolean;
}
 
export class UserPermissionModel{
    UserID : number;
    PermissionList : Array<SelectItem>;
    Permissions : Array<number>;
}
 
export class UserListModel{
    ListUser :Array<UserModel>;
    TotalRecords : number;
}

