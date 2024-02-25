import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: '<p>Created by SILAB students, 2023</p>',
  styles: [
    `
      p {
        color: gray;
        border-top: 1px solid gray;
        padding: 1rem;
        margin: 0 2rem;
        text-align: center;
      }
    `,
  ],
})
export class FooterComponent {}
