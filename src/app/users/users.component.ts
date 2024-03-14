import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../service/users.service';
import { FormsModule } from '@angular/forms';
import { User } from '../model/user.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchBoxComponent } from '../components/search-box/search-box.component';
import { delay } from 'rxjs';
import { UsersListComponent } from '../components/users-list/users-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink,RouterLinkActive,SearchBoxComponent,UsersListComponent],
  template: `
    <!-- <input type="text" placeholder="search term..." [ngModel]="query" (ngModelChange)="query = $event; search_q();"> -->
    <!-- <input type="text" placeholder="search term..." [(ngModel)]="query" (ngModelChange)="search_q()"> -->
    <!-- <input type="text" placeholder="search term..."  [ngModel]="query" (ngModelChange)="search($event)"/> -->

    <!-- <input type="text" placeholder="search term..." (keyup)="onKey($event)"> -->
    <app-search-box (newTerm)="search($event)"></app-search-box>
    <p *ngIf="isLoading">Loading...</p>
    <app-users-list [usersCompList]="users" [isLink]="true"></app-users-list>
    <div *ngIf="resultUsers.length >= 1">
      <p>Search result:</p>
      <app-users-list [usersCompList]="resultUsers" [isLink]="false"></app-users-list>
    </div>
    <!-- {{users | json}} -->
    <!-- <ul>
      <li *ngFor="let user of users" (click)="stampajIme(user)">
        <a routerLink="/users/{{user.id}}" routerLinkActive="active" >{{ user.firstName + ' ' + user.lastName }}</a>
      </li>
    </ul> -->
      <!-- <ul>
        <li *ngFor="let user of resultUsers">
          {{ user.firstName + ' ' + user.lastName }}
        </li>
      </ul> -->
  `,
})
export class UsersComponent implements OnInit {
  // @Input() users: string[] = [];
  // @Output() logUser = new EventEmitter();
  // user: User = { firstName: '' , id:2};

  // constructor(private usersService: UsersService) {} bolji za testiranje!!!
  private usersService: UsersService = inject(UsersService); //moraju helperi

  users: User[] = [];
  resultUsers: User[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.usersService.getAll().pipe(delay(500)).subscribe((users) => {
      this.users = users;
      this.isLoading = false;
    });
  }
  search(term: string): void {
    console.log(term);
    if (!term || term.length == 0) {
      this.resultUsers = [];
      return;
    }
    this.resultUsers = this.users.filter((user) =>
    user.firstName.toLowerCase().includes(term.toLowerCase())
    );
  }
  onKey(event:any){
    this.search(event.target.value)
  }
  // stampajIme(_t7: User) {
  //   console.log(_t7.firstName);
  // }
  // search_q(): void {
  //   console.log(this.query);
  //   if (!this.query || this.query.length == 0) {
  //     this.resultUsers = [];
  //     return;
  //   }
  //   this.resultUsers = this.users.filter((user) =>
  //     user.firstName.toLowerCase().includes(this.query.toLowerCase())
  //   );
  // }
}
