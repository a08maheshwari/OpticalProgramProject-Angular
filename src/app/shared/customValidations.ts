import { FormControl, ValidatorFn, Validators } from '@angular/forms';
export class CustomValidation {

    static checkValidDate(control: FormControl) {

        let CurrentDate = new Date().setHours(0, 0, 0, 0);
        let EnteredDate = new Date(control.value).setHours(0, 0, 0, 0);

        if (EnteredDate < CurrentDate) {
            return { checkValidDate: true };
        }
        return null;
    }

    static validAppTime(control: FormControl) {
        if (control.parent != undefined) {
            let AppointmentDate = control.parent.controls["AppDate"].value;
            if (AppointmentDate != "" && AppointmentDate != undefined) {
                let AppointmentTime: Date = control.value;
                let CurrentDate: Date = new Date();
                let AppDateTime = new Date(AppointmentDate.setHours(AppointmentTime.getHours(), AppointmentTime.getMinutes(), 0, 0));
                if (AppDateTime.getTime() < CurrentDate.getTime()) {
                    return { validateAppTime: true };
                }
            }
        }
        return null;
    }

    static validAppDuration(control: FormControl) {
        if (control.parent != undefined) {
            let AppointmentDate = control.parent.controls["AppDate"].value;
            if (AppointmentDate != "" && AppointmentDate != undefined) {
                let AppointmentEnd = control.parent.controls["AppEndTime"].value;
                let AppointmentStart = control.parent.controls["AppStartTime"].value;
                if (AppointmentEnd != undefined && AppointmentStart != undefined) {

                    if(AppointmentStart.getHours() >  AppointmentEnd.getHours())
                    {
                        return { validAppDuration: true };
                    }else if(AppointmentStart.getHours() ==  AppointmentEnd.getHours()){
                        if(AppointmentStart.getMinutes() >  AppointmentEnd.getMinutes())
                        {
                                return { validAppDuration: true };
                        }
                    }
                }
            }
        }
        return null;
    }
}