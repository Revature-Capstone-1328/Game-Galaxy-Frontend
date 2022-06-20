import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  newEmail:string="";

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  update(){
    if(this.newEmail){
      this.userService.update(this.newEmail); 
    }
  }

}
