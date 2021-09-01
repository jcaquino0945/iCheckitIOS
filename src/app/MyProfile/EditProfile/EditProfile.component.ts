import { Application } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";
import { AuthService } from "~/app/services/Auth/auth.service";
@Component({
  selector: "EditProfile",
  templateUrl: "./EditProfile.component.html",
  styleUrls: ["./EditProfile.component.css"]
})
export class EditProfileComponent implements OnInit {
  _fullName = "";
  _number = "";

  constructor(private modalDialogParams: ModalDialogParams, private auth: AuthService) {}

  ngOnInit() {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  onUpdate() {
    this._fullName;
    this._number;
    this.auth.editProfile(this._fullName)
    this.modalDialogParams.closeCallback();
  }
}
