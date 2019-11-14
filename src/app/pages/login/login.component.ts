import { Component, OnInit } from "@angular/core";
import { LoginModel } from "src/app/models/login.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  login: LoginModel;

  constructor() {}

  ngOnInit() {
    this.login = new LoginModel();
  }

  public onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    console.log(loginForm);
  }
}
