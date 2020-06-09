import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
import { Roles } from '../shared/user';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }


  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }

  

   signUp(nombre, apellidos, email, password){   
    this.authService.RegisterUserO(email.value, password.value)
    .then(async user => { 
      const loading = await this.loadingCtrl.create({
        message: 'Espere por favor. . .'
    });     
      // Do something here
      //this.authService.SendVerificationMail()
      //this.router.navigate(['verify-email']); //Despues veo la parte de verificar..
      if(user){
        this.authService.updateProfile(nombre.value, apellidos.value)
         
        loading.present(); 
        
        
      }
     //this.authService.updateProfile(nombre, apellidos)
     
     setTimeout(async () => {     
      await this.presentAlert('Success', 'Esta registrado!')      
      loading.dismiss();
      
      }, 8000);       
     await this.router.navigate(['menu/home']);
     window.location.reload();
    }).catch((error) => {
      window.alert(error.message)
    })
}




}
