import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
@Component({
  moduleId: module.id,
  selector: "Faqs",
  templateUrl: "./Faqs.component.html",
  styleUrls: ["./Faqs.component.css"]
})
export class FaqsComponent implements OnInit {
  dateToday = Date.now();
  isToggled = [false, false, false, false];
  constructor() {}

  ngOnInit() {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  onTap(index: number) {
    this.isToggled.fill(false, 0);
    this.isToggled[index] = !this.isToggled[index];
  }
}
