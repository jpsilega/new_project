import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor() { }

  
    
    ngOnInit() { }  

  
    contact= [
     {
      email: 'new_project@gmail.com',
      phoneNumbers: '09312111111'
     },
     {
      email: 'sugerencia@gmail.com',
      phoneNumbers: '09456666666'
     },
     {
      email: 'reclamo@gmail.com',
      phoneNumbers: '09567678888'
     }
    ]
}






