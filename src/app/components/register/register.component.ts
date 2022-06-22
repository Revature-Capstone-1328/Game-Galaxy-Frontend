import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUsername:string="";
  newPassword:string="";

  newEmail:string="";
  errorMessage:string = '';

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  generateHash(password:string) {
     const salt = bcrypt.genSaltSync(12);
     const hash = bcrypt.hashSync(password, salt);
     return hash;
  }


  register(){
    let user:User = new User(0, 
      this.newUsername, this.newPassword, this.newEmail); 
      console.log("Hashed password " + user.password + " is: " + this.generateHash(user.password));
      const hashedPass = this.generateHash(user.password);
      user.password = hashedPass;
    this.userService.registerUser(user).subscribe({
      next:() => {
        this.router.navigate(["/login"]);
      },
      error:()=>{
        this.errorMessage='There was a problem registering. Try another username or E-mail address.';
      }
    })

  }

}