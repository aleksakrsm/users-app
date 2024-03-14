import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <ul>
    <li *ngFor="let user of usersCompList">
      <a *ngIf="isLink" routerLink="/users/{{ user.id }}">{{user.firstName + ' ' + user.lastName}}</a>
      <p *ngIf="!isLink">{{user.firstName + ' ' + user.lastName}}</p>
    <span *ngIf="user.adress">
      {{user.adress.town + ", " + user.adress.zipcode}}
    </span>
    </li>
  </ul>`,
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Input() usersCompList: User[] = [];
  @Input() isLink:boolean = true;
}
