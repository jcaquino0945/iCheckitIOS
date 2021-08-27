import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { ForgotPasswordComponent } from './Forgot-Password/Forgot-Password.component';
import { DashboardComponent } from './Dashboard/Dashboard.component';
import { MyProfileComponent } from './MyProfile/MyProfile.component';
import { ConfirmNewPasswordComponent } from './confirm-new-password/confirm-new-password.component'
//new Imports for Data Binding
import { NativeScriptFormsModule } from '@nativescript/angular';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptUISideDrawerModule,
    NativeScriptFormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ConfirmNewPasswordComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
