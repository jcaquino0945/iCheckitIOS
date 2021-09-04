import { Application } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";
import { AuthService } from "~/app/services/Auth/auth.service";
import { firebase, firestore } from "@nativescript/firebase";
@Component({
  selector: "EditProfile",
  templateUrl: "./EditProfile.component.html",
  styleUrls: ["./EditProfile.component.css"]
})
export class EditProfileComponent implements OnInit {
  _fullName = "";
  _number = "";
  userData;
  userDetails;

  constructor(
    private modalDialogParams: ModalDialogParams,
    private auth: AuthService
  ) {}

  ngOnInit() {
     firebase
      .getCurrentUser()
      .then(user => {
        (this.userData = user),
          firestore
            .collection("users")
            .doc(this.userData.uid)
            .get({ source: "cache" }).then(doc => {
              if (doc.exists) {
                console.log(`Document data: ${JSON.stringify(doc.data())}`);
                this.userDetails = doc.data();
              } else {
                console.log("No such document!");
              }
            });
          
      })
      .catch(error => console.log("Trouble in paradise: " + error));
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  onUpdate() {
    this.auth.editProfile(this._fullName, this._number, this.userData.uid);
    this.modalDialogParams.closeCallback();
  }

  
}
