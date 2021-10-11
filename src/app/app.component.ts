import { AuthService } from "~/app/services/Auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition
} from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import { Application } from "@nativescript/core";
import { firebase } from "@nativescript/firebase";
import { Theme } from "@nativescript/theme";
import { firestore } from "@nativescript/firebase";

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  userData;
  userDetails;
  private _activatedUrl: string;
  private _sideDrawerTransition: DrawerTransitionBase;
  constructor(
    private router: Router,
    private routerExtensions: RouterExtensions,
    private auth: AuthService
  ) {
    // Use the component constructor to inject services.
  }

  ngOnInit() {
    firebase
      .init({
        showNotifications: true,
        showNotificationsWhenInForeground: true,

        onPushTokenReceivedCallback: (token) => {
          console.log('[Firebase] onPushTokenReceivedCallback:', { token });
          console.log('my push token:' + token);
        },

        onMessageReceivedCallback: (message: firebase.Message) => {
          console.log('[Firebase] onMessageReceivedCallback:', { message });
        }
        // Optionally pass in properties for database, authentication and cloud messaging,
        // see their respective docs.
      })
      .then(
        () => {
          console.log("firebase.init done");
        },
        error => {
          console.log(`firebase.init error: ${error}`);
        }
      );
    // configure a listener:
    var listener = {
      onAuthStateChanged: function(data) {
        console.log(
          data.loggedIn ? "Logged in to firebase" : "Logged out from firebase"
        );
        if (data.loggedIn) {
          this.routerExtensions.navigate(["dashboard"], {
            transition: {
              name: "fade"
            }
          });        } else if (!data.loggedIn) {
          alert("You session has expired. Please login again");
          this.routerExtensions.navigate(["login"], {
            transition: {
              name: "fade"
            }
          });        }
      },
      thisArg: this
    };

    // add the listener:
    firebase.addAuthStateListener(listener);
    if (Application.android) {
      try {
        Theme.setMode(Theme.Light);
      } catch (e) {
        console.log("Error setting Theme to light mode", e);
      }
    }

    this._activatedUrl = "/home";
    this._sideDrawerTransition = new SlideInOnTopTransition();

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(
        (event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects)
      );

    return firebase
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
              } else {
                console.log("No such document!");
              }
            });
      })
      .catch(error => console.log("Trouble in paradise: " + error));
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: "fade"
      }
    });

    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.closeDrawer();
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(["/login"]);
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.closeDrawer();
  }
}
