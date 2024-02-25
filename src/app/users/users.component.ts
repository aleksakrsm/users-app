import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from './users.service';
import { FormsModule } from '@angular/forms';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- zasto nece ove tri linije linija -->
    <!-- <input type="text" placeholder="search term..." [ngModel]="query" (ngModelChange)="search_q()"/> -->
    <!-- <input type="text" placeholder="search term..."  [ngModel]="" (ngModelChange)="search($event)"/> -->
    <!-- <input type="text" placeholder="search term..."  (ngModelChange)="search($event)"/> -->
    
    
    
    <!-- <input type="text" placeholder="search term..." [ngModel]="query" (ngModelChange)="query = $event; search_q();"> -->
    <!-- <input type="text" placeholder="search term..." [(ngModel)]="query" (ngModelChange)="search_q()"> -->
    <!-- <input type="text" placeholder="search term..."  [ngModel]="query" (ngModelChange)="search($event)"/> -->
    <input type="text" placeholder="search term..." (keyup)="onKey($event)">


    <p *ngIf="isLoading">Loading...</p>
    <ul>
      <li *ngFor="let user of users" (click)="stampajIme(user)">
        {{ user.firstName + ' ' + user.lastName }}
      </li>
    </ul>
    <div *ngIf="resultUsers.length >= 1">
      <p>Search results for : {{ query }}</p>
      <ul>
        <li *ngFor="let user of resultUsers">
          {{ user.firstName + ' ' + user.lastName }}
        </li>
      </ul>
    </div>
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
  query = '';

  ngOnInit(): void {
    // console.log('dafsag');
    // this.users = this.usersService.getAll().subscribe();
    this.usersService.getAll().subscribe((users) => {
      this.users = users;
      this.isLoading = false;
    });
  }
  stampajIme(_t7: User) {
    console.log(_t7.firstName);
  }
  search_q(): void {
    console.log(this.query);
    if (!this.query || this.query.length == 0) {
      this.resultUsers = [];
      return;
    }
    this.resultUsers = this.users.filter((user) =>
      user.firstName.toLowerCase().includes(this.query.toLowerCase())
    );
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
    // this.query = event.target.value;
    // this.search_q();
    this.search(event.target.value)
  }
}
