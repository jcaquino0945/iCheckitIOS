import { Application, View } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { firebase, firestore } from "@nativescript/firebase";
import {
  Mediafilepicker,
  FilePickerOptions
} from "nativescript-mediafilepicker";

@Component({
  selector: "DashboardDetails",
  templateUrl: "./DashboardDetails.component.html",
  styleUrls: ["./DashboardDetails.component.css"]
})
export class DashboardDetailsComponent implements OnInit {
  id;
  userData;
  userDetails;
  taskData;
  file;
  private _hostView: View;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
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
                const taskDocument = firestore
                  .collection("tasks")
                  .doc(this.route.snapshot.paramMap.get("id"));

                // note that the options object is optional, but you can use it to specify the source of data ("server", "cache", "default").
                taskDocument.get({ source: "cache" }).then(doc => {
                  if (doc.exists) {
                    this.taskData = doc.data();
                    console.log(`Document data: ${JSON.stringify(doc.data())}`);
                  } else {
                    console.log("No such document!");
                  }
                });
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

  // submitTask() {
  //   alert("Submit attachment of task");
  // }

  submitTask() {
    let extensions = [];

    if (Application.ios) {
      extensions = [kUTTypePDF, kUTTypeText]; // you can get more types from here: https://developer.apple.com/documentation/mobilecoreservices/uttype
    } else {
      extensions = ["pdf"];
    }

    let options: FilePickerOptions = {
      android: {
        extensions: extensions,
        maxNumberFiles: 1
      },
      ios: {
        extensions: extensions,
        multipleSelection: true,
        hostView: this._hostView
      }
    };

    let mediafilepicker = new Mediafilepicker();

    mediafilepicker.openFilePicker(options);

    mediafilepicker.on("getFiles", function(res) {
      let results = res.object.get("results");
      console.dir(results);

      if (results) {
        for (let i = 0; i < results.length; i++) {
          let result = results[i];
          console.log(result.file);
          this.file = result.file
          console.log(this.file);
        }
      }
    });

    mediafilepicker.on("error", function(res) {
      let msg = res.object.get("msg");
      console.log(msg);
    });

    mediafilepicker.on("cancel", function(res) {
      let msg = res.object.get("msg");
      console.log(msg);
    });
  }
}
