import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";

@Component({
  moduleId: module.id,
  selector: "Contact-Us",
  templateUrl: "./Contact-Us.component.html",
  styleUrls: ["./Contact-Us.component.css"]
})
export class ContactUsComponent implements OnInit {
  dateToday = Date.now();
  constructor() {}

  ngOnInit() {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }
}
