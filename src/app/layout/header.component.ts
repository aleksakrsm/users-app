import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <ul>
    </ul>
  `,
  styles: [
    `
      ul {
        margin: 0;
        padding: 1rem;
        background-color: rebeccapurple;
        list-style-type: none;
        display: flex;
        flex-direction: row;
        gap: 1rem;
      }

      a {
        color: white;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    `,
  ],
})
export class HeaderComponent {}
