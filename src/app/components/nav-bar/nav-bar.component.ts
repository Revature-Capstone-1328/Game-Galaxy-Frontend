import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  username:string = (this.userService.activeUser)?this.userService.activeUser.username:"";

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
  }

}
