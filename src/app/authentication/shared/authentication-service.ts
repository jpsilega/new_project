import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from './user';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;
  displayName: string;
  email: string;
  photoURL: string;
  phoneNumber: string;

  private users: User;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    public alertController: AlertController,
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }


  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }

 
  

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.auth.signInWithEmailAndPassword(email, password)
  }

  // Register user with email/password
  RegisterUser(nombre, apellidos, email, password) {
    
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password)
  
  }


  RegisterUserO(email, password){
    //return new Promise((resolve, reject) => {
     return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password)    
      /*  .then(user => {        
          resolve(user)         
          this.ngFireAuth.auth.currentUser.updateProfile({
            displayName: 
            (`${nombre} ${apellidos}`) ? `${nombre} ${apellidos}`  : this.ngFireAuth.auth.currentUser.displayName ,
            photoURL: 
            (apellidos) ? apellidos : this.ngFireAuth.auth.currentUser.photoURL
            });
          
        }).catch(err => console.log(reject(err)))*/
    //});
  }



  // Actualizar perfil firebase...ver despues....
updateProfile(name?,apellidos?):Promise<void> {
  return this.ngFireAuth.auth.currentUser.updateProfile({
    displayName: 
    (`${name} ${apellidos}`) ? `${name} ${apellidos}`  : this.ngFireAuth.auth.currentUser.displayName,
  photoURL: 
  (apellidos) ? apellidos : this.ngFireAuth.auth.currentUser.photoURL 
  });
  }


  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['menu/home']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Store user in localStorage
  SetUserData(user, nombre?) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.user.uid}`);
    const userData: User = {
      uid: user.uid,
      username: user.username,
      email: user.email,
      displayName: nombre,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      roles: user.roles //añadido...ver despues
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign-out 
  SignOut() {
    return this.ngFireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');          
      this.router.navigate(['']);
      //window.location.reload(); 
    })
  }

}