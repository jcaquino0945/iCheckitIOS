import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'
import { LoginComponent } from './Login/Login.component'
import { RegisterComponent } from './Register/Register.component';
import { ForgotPasswordComponent } from './Forgot-Password/Forgot-Password.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { MyProfileComponent } from './MyProfile/MyProfile.component';

const routes: Routes = [
  { path: '', redirectTo: '/forgot-password', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'my-profile', component: MyProfileComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
