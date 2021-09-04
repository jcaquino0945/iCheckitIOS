import { Application } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";
import { AuthService } from "~/app/services/Auth/auth.service";
import { firebase } from "@nativescript/firebase";
@Component({
  selector: "EditProfile",
  templateUrl: "./EditProfile.component.html",
  styleUrls: ["./EditProfile.component.css"]
})
export class EditProfileComponent implements OnInit {
  _fullName = "";
  _number = "";
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
    this._fullName;
    console.log("from component");
    console.log(this._fullName);
    this._number;
    this.auth.editProfile(this._fullName, this._number, this.userData.uid);
    this.modalDialogParams.closeCallback();
  }

  
}
