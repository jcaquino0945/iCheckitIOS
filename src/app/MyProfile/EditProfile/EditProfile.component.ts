import { Application } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";
import { AuthService } from "~/app/services/Auth/auth.service";
import { firebase, firestore } from "@nativescript/firebase";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";

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
  editForm: FormGroup;

  constructor(
    private modalDialogParams: ModalDialogParams,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // this.editForm.controls._fullName.setValue()
    // this.editForm.controls._fullName.setValue(this.auth.getUserData)

    this.editForm = this.fb.group({
      _fullname: ['', Validators.required],
      _number: ['', Validators.required]
    })
    

    firebase
      .getCurrentUser()
      .then(user => {
        (this.userData = user),
          firestore
            .collection("users")
            .doc(this.userData.uid)
            .get()
            .then(doc => {
              if (doc.exists) {
                console.log(`Document data: ${JSON.stringify(doc.data())}`);
                this.userDetails = doc.data();
                this.editForm.controls._fullName.setValue(doc.data().displayName)
              } else {
                console.log("No such document!");
              }
            });
      })
      .catch(error => console.log("Trouble in paradise: " + error));

    // this.editForm = new FormGroup({
    //   _fullName: new FormControl(this.userDetails.displayName),
    //   _number: new FormControl(this.userDetails.contactNumber)
    // });

    // this.editForm = new FormGroup({
    //   _fullName: new FormControl(
    //     this.auth.getName(this.userData.uid, this._fullName)
    //   ),
    //   _number: new FormControl("09123789172")
    // });

    // this.editForm = new FormGroup({
    //   _fullName: new FormControl(this.auth.getName(this.userData.uid, this._fullName)),
    //   _number: new FormControl("09123789172")
    // });
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
