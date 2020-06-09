import { Component,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
 
  isEmailVerified: boolean = true;   //Esto no es asi...pero lo pongo en true para probar


  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {}

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
       /* if(this.authService.isEmailVerified) {
          this.router.navigate(['menu/home']);          
        }*/if(this.isEmailVerified) {
          this.router.navigate(['menu/home']);          
        } else {
          window.alert('Correo no verificado...')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      })
  }

}