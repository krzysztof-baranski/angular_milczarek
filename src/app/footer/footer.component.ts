import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  footerItems = [
    {
      link: 'home',
      name: 'Home'
    },
    {
      link: 'about',
      name: 'About'
    }
  ];
}
