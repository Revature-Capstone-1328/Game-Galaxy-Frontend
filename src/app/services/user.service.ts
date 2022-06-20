import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = 'http://localhost:8087/users/';

  activeUser:User|null = null;
  loggedIn:boolean = false;

  constructor(private http:HttpClient) { }

  attemptLogin(user:User):Observable<User>{
    return (this.http.post(this.url,user,{withCredentials:true}) as Observable<User>)
  }

  registerUser(user:User):Observable<unknown>{
    console.log("registering user: " + user);
    return this.http.post(this.url+"register", user);
  }

  logout(){
    console.log("Before logout: " + this.activeUser?.username)
    console.log("Logged in? " + this.loggedIn)
    this.activeUser = null;
    this.loggedIn = false;
    console.log("After logout: " + this.activeUser)
    console.log("Logged in? " + this.loggedIn)  
  }

}