import { Component, OnInit } from "@angular/core";
import { LoginModel } from "src/app/models/login.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  login: LoginModel;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.login = new LoginModel();
  }

  public onSubmit(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere por favor..."
    });
    Swal.showLoading();

    this.auth.login(this.login).subscribe(
      response => {
        console.log(response);
        Swal.close();
        this.router.navigateByUrl("/home");
      },
      err => {
        Swal.fire({
          icon: "error",
          title: "Error al autenticar",
          text: err.error.error.message
        });
      }
    );
    console.log(loginForm);
  }
}
