import { AuthService } from "./../../services/Auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { ModalDialogParams } from "@nativescript/angular";
import { firebase, firestore } from "@nativescript/firebase";

@Component({
  selector: "ChangePassword",
  templateUrl: "./ChangePassword.component.html",
  styleUrls: ["./ChangePassword.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  _oldPass = "";
  _newPass = "";
  userData;

  constructor(
    private modalDialogParams: ModalDialogParams,
    private auth: AuthService
  ) {}

  ngOnInit() {
    return firebase
      .getCurrentUser()
      .then(user => (this.userData = user))
      .catch(error => console.log("Trouble in paradise: " + error));
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  onUpdate() {
    this._oldPass;
    this._newPass;
    this.auth.updatePassword(this.userData.email, this._oldPass, this._newPass);
    this.modalDialogParams.closeCallback();
  }
}
