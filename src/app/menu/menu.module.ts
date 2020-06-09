import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'login',
        loadChildren: '../login/login.module#LoginPageModule'
      },
      {
        path: 'register',
        loadChildren: '../register/register.module#RegisterPageModule'
      },
      {
        path: 'contact',
        loadChildren: '../contact/contact.module#ContactPageModule'
      },
      {
        path: 'ayuda',
        loadChildren: '../ayuda/ayuda.module#AyudaPageModule'
      },
      {
        path: 'pago',
        loadChildren: '../pago/pago.module#PagoPageModule'
      },
      {
        path: 'configuracion',
        loadChildren: '../configuracion/configuracion.module#ConfiguracionPageModule'
      }
    ]
  }, 
  {
    path: 'menu',
    redirectTo: 'menu/home'
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})

export class MenuPageModule { }