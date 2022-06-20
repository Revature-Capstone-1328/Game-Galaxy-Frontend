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
  isLogged:boolean = false;

  constructor(private http:HttpClient) { }

  attemptLogin(user:User):Observable<User>{
    return (this.http.post(this.url,user,{withCredentials:true}) as Observable<User>)
  }

  registerUser(user:User):Observable<unknown>{
    console.log("registering user: " + user);
    return this.http.post(this.url+"register", user);
  }

  logout(){
    this.activeUser = null; 
    this.isLogged = false;
  }

  update(eMail:string):Observable<unknown>|null{
    if(this.activeUser){
      this.activeUser.eMail = eMail;
      return this.http.put(this.url,this.activeUser,{withCredentials:true});
    }
    console.log("Updating went wrong!");
    return null;
  }
}