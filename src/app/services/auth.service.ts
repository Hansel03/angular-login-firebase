import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginModel } from "../models/login.model";
import { UsuarioModel } from "../models/usuario.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private apiKey = "AIzaSyCgFa-3pea8Snxj_RMpruLzYqdv1MCyvy0";
  public userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  login(login: LoginModel) {
    const authData = {
      ...login,
      returnSecureToken: true
    };

    return this.http
      .post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
      .pipe(
        map(response => {
          console.log("Entro en el map de RXJS");
          this.guardarToken(response["idToken"]);
          return response;
        })
      );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http
      .post(`${this.url}signUp?key=${this.apiKey}`, authData)
      .pipe(
        map(response => {
          console.log("Entro en el map de RXJS");
          this.guardarToken(response["idToken"]);
          return response;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);
  }

  public leerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }

    return this.userToken;
  }

  public estaAutenticado(): boolean {
    return this.userToken.length > 2;
  }

  public logout() {
    localStorage.removeItem("token");
  }
}
