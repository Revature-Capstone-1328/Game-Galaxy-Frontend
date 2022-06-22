import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { UserInformationComponent } from './components/user-information/user-information.component';

const routes: Routes = [{
  path: "",
  component: StoreComponent
}, {
  path: "login",
  component: LoginComponent
}, {
  path: "register",
  component: RegisterComponent
}, {
  path: 'store',
  component: StoreComponent
}, {
  path: 'cart',
  component: CartComponent
}, {
  path: 'checkout',
  component: CheckoutComponent
}, {
  path: 'logout',
  component: LogoutComponent
}, {
  path: 'userInformation',
  component: UserInformationComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
