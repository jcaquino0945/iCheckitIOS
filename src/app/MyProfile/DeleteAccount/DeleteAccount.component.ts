import { Router } from "@angular/router";
import { AuthService } from "~/app/services/Auth/auth.service";
import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";
@Component({
  selector: "DeleteAccount",
  templateUrl: "./DeleteAccount.component.html",
  styleUrls: ["./DeleteAccount.component.css"]
})
export class DeleteAccountComponent implements OnInit {
  constructor(
    private modalDialogParams: ModalDialogParams,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onUpdate() {
    // this.auth
    //   .deleteAccount()
    //   .then(() => {
    //     this.modalDialogParams.closeCallback("delete");
    //   })
    //   .then(() => this.router.navigate(["/login"]));

    this.auth.deleteAccount();
    this.modalDialogParams.closeCallback();
  }

  goBack() {
    // this.router.navigate(["/login"]);
  }
}
