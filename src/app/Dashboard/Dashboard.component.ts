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
  myPendingTasks = [];
  myLateTasks = [];
  myForApprovalTasks = [];
  myAccomplishedTasks = [];

  ngOnInit() {
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
                //display data in console
                console.log(`Document data: ${JSON.stringify(doc.data())}`);
                // console.log(doc.data().section);
              
                //reference to collection "tasks"
                const citiesCollection = firestore.collection("tasks");
                //query for all tasks documents that contains the user's section
                const query = citiesCollection.where(
                  "scope",
                  "array-contains",
                  doc.data().section
                );

                //prompting the query
                query.get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    this.myTasks.push(doc.data());
                    console.log(
                      `Relatively small Californian city: ${
                        doc.id
                      } => ${JSON.stringify(doc.data())}`
                    );
                  });
                });

                const pendingQuery = citiesCollection
                  .where("status", "==", "Pending")
                  .where("scope", "array-contains", doc.data().section);
                pendingQuery.get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    this.myPendingTasks.push(doc.data());
                    console.log(
                      `Relatively small Californian city: ${
                        doc.id
                      } => ${JSON.stringify(doc.data())}`
                    );
                  });
                });

                const lateQuery = citiesCollection
                  .where("status", "==", "Late")
                  .where("scope", "array-contains", doc.data().section);
                lateQuery.get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    this.myLateTasks.push(doc.data());
                    console.log(
                      `Relatively small Californian city: ${
                        doc.id
                      } => ${JSON.stringify(doc.data())}`
                    );
                  });
                });

                const approvalQuery = citiesCollection
                  .where("status", "==", "For Approval")
                  .where("scope", "array-contains", doc.data().section);
                approvalQuery.get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    this.myForApprovalTasks.push(doc.data());
                    console.log(
                      `Relatively small Californian city: ${
                        doc.id
                      } => ${JSON.stringify(doc.data())}`
                    );
                  });
                });

                const accomplishedQuery = citiesCollection
                  .where("status", "==", "Accomplished")
                  .where("scope", "array-contains", doc.data().section);
                accomplishedQuery.get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    this.myAccomplishedTasks.push(doc.data());
                    console.log(
                      `Relatively small Californian city: ${
                        doc.id
                      } => ${JSON.stringify(doc.data())}`
                    );
                  });
                });

                //bind doc.data() to userDetails to be used in frontend
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

  onDetails(taskId) {
    this.router.navigate(["/dashboard-details/", taskId]);
  }
}
