import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import {
  DrawerTransitionBase,
  RadSideDrawer,
  SlideInOnTopTransition,
} from 'nativescript-ui-sidedrawer'
import { filter } from 'rxjs/operators'
import { Application } from '@nativescript/core'
import { firebase } from "@nativescript/firebase"
import { Theme } from '@nativescript/theme'

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _activatedUrl: string
  private _sideDrawerTransition: DrawerTransitionBase

  constructor(private router: Router, private routerExtensions: RouterExtensions) {
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {
    if (Application.android) {
      try {
        Theme.setMode(Theme.Light);
      } catch (e) {
        console.log("Error setting Theme to light mode", e);
      }
    }

    firebase.init({
      onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when they re-visit your app
          console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
          if (data.loggedIn) {
            console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
          }
        }
      // Optionally pass in properties for database, authentication and cloud messaging,
      // see their respective docs.
    }).then(
      () => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );
    this._activatedUrl = '/home'
    this._sideDrawerTransition = new SlideInOnTopTransition()

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects))
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: 'fade',
      },
    })

    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.closeDrawer()
  }
}
