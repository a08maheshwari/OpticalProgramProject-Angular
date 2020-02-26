import { Component, OnInit } from '@angular/core';
import { commonService } from "../../Service/common.service";



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})

export class UserComponent {

  constructor(private commonService: commonService){
       
    }
}
