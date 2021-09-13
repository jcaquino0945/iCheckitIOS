import { Application } from "@nativescript/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { firebase, firestore } from "@nativescript/firebase";

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
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    firebase
    .getCurrentUser()
    .then(user => {
      (this.userData = user),
        firestore
          .collection("users")
          .doc(this.userData.uid)
          .get().then(doc => {
            if (doc.exists) {
              console.log(`Document data: ${JSON.stringify(doc.data())}`);
              const taskDocument = firestore.collection("tasks").doc(this.route.snapshot.paramMap.get('id'));

              // note that the options object is optional, but you can use it to specify the source of data ("server", "cache", "default").
              taskDocument.get({ source: "cache" }).then(doc => {
                if (doc.exists) {
                  // this.taskData = doc.data();
                  doc.data().recipients.forEach(element => {
                    if(Object.values(element).includes(this.userData.uid)) { 
                      console.log(element)
                      console.log('it exists')
                      this.taskData = element;
                  }
                  });
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

  submitTask() {
    alert("Submit attachment of task");
  }
}
