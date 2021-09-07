import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { RouterLink } from "@angular/router";
import { firebase, firestore } from "@nativescript/firebase";
@Component({
  moduleId: module.id,
  selector: "Dashboard",
  templateUrl: "./Dashboard.component.html",
  styleUrls: ["./Dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  dateToday = Date.now();
  constructor(private router: Router) {}
  userData;
  userDetails;
  myTasks = [];
  ngOnInit() {
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
              console.log(doc.data().section);
                const citiesCollection = firestore.collection("tasks");
                const query = citiesCollection
                .where("scope", "array-contains", doc.data().section)
                query
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    this.myTasks.push(doc.data());
                    console.log(`Relatively small Californian city: ${doc.id} => ${JSON.stringify(doc.data())}`);
                  });
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

  onDetails() {
    this.router.navigate(["/dashboard-details/", 12]);
  }
}
