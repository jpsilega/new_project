import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from '../authentication/shared/authentication-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  activePath = '';
  puntage: number = 4.5; // El puntage 
  user = JSON.parse(localStorage.getItem('user'));
 

  name: string = 'Ismael Pujals Viera';  // Aqui se pone el currentUser
  src: string = 'assets/ismael.jpg';      // direccion de la imagen del usuario
  email: string;


  imagen: string = 'assets/bandera-uruguay.jpg';

  currents= this.user.displayName;

  pages = [
    {
      name: 'Login',
      path: '/menu/login'
    },
    {
      name: 'Register',
      path: '/menu/register'
    },
    {
      name: 'Home',
      path: '/menu/home'
    },
    {
      name: 'Contact',
      path: '/menu/contact'
    },
    {
      name: 'Ayuda',
      path: '/menu/ayuda'
    },
    {
      name: 'Pago',
      path: '/menu/pago'
    },
    {
      name: 'Configuración',
      path: '/menu/configuracion'
    }
  ]

  

  constructor(private router: Router, public authService: AuthenticationService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath = event.url
    })
  }


  

  ngOnInit() {
    
  }

  Editar(){
    console.log("Esto se implementara para editar y actualizar usuario...")
  }

}
