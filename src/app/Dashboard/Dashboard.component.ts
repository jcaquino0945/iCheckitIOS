import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { RouterLink } from "@angular/router";
@Component({
  moduleId: module.id,
  selector: "Dashboard",
  templateUrl: "./Dashboard.component.html",
  styleUrls: ["./Dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  dateToday = Date.now();
  constructor(private router: Router) {}

  ngOnInit() {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  onDetails() {
    this.router.navigate(["/dashboard-details/", 12]);
  }
}
