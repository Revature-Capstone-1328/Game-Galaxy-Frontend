import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as bcrypt from 'bcryptjs';
import { UserInformationComponent } from '../components/user-information/user-information.component';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = 'http://localhost:8087/users/';

  activeUser:User|null = null;
  isLoggedIn:boolean = false;

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
    this.isLoggedIn = false;
  }

  updateEmail(eMail:string):Observable<unknown>|null{
    if(this.activeUser){
      this.activeUser.eMail = eMail;
      return this.http.put(this.url,this.activeUser,{withCredentials:true});
    }
    console.log("Updating went wrong!");
    return null;
  }

  updatePwd(pwd:string):Observable<unknown>|null{
    if(this.activeUser){
      console.log(this.activeUser.password);
      this.activeUser.password = this.generateHash(pwd);
      console.log(this.activeUser.password);
      return this.http.put(this.url,this.activeUser,{withCredentials:true});
    }
    console.log("Updating went wrong!");
    return null;
  }

  generateHash(password:string) {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
 }

  loggedUser = (): string | null => (sessionStorage.getItem("User")) ? sessionStorage.getItem("User") : "";

  loggedUserEmail = (): string | null => (sessionStorage.getItem("Email")) ? sessionStorage.getItem("Email") : "";

  isLogged = (): boolean => (sessionStorage.getItem("User")) ? true : false;

  clearAll = (): void => sessionStorage.clear();

}
