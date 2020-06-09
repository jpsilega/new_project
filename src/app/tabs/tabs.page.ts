import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  activePath = '';

  pages = [
    {
      name: 'About',
      path: '/tab/about'
    },
    {
      name: 'Home',
      path: '/tab/home'
    },
    {
      name: 'Contact',
      path: '/tab/contact'
    }
  ]

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.activePath = event.url
    })
  }

  ngOnInit() {
  }
}
