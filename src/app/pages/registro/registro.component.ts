import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "src/app/models/usuario.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme: boolean;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
    this.recordarme = false;
  }

  public onSubmit(registroForm: NgForm) {
    if (registroForm.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere por favor..."
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(
      response => {
        Swal.close();
        this.router.navigateByUrl("/home");
        console.log(response);
      },
      err => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: "error",
          title: "Error al registrar",
          text: err.error.error.message
        });
      }
    );
    console.log(registroForm);
  }
}
