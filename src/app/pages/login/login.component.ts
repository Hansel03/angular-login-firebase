import { Component, OnInit } from "@angular/core";
import { LoginModel } from "src/app/models/login.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  login: LoginModel;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.login = new LoginModel();
  }

  public onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    this.auth.login(this.login).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.log(err.error.error.message);
      }
    );
    console.log(loginForm);
  }
}
