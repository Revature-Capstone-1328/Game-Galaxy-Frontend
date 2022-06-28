import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
 }

  username:string = (this.userService.activeUser)?this.userService.activeUser.username:"";

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
    console.log("Logged out!");
    window.location.reload();
    this.router.navigate(["/login"]);
  }

}
