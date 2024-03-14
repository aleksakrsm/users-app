import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { Route, provideRouter } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './user-edit/user-edit.component';

export const appRouts: Route[] = [
  // {
  //   path: "user/:id",
  //   title:"user",
  //   component: UserEditComponent,
  // },
  // {
  //   path: "users",
  //   title:"Users",
  //   component: UsersComponent,
  // },
  {
    path: 'users',
    children: [
      {
        path: '',
        title: 'Users',
        component: UsersComponent
      },
      {
        path: ':id',
        title: 'Edit user',
        component: UserEditComponent
      },
    ],
  },
  {
    path: 'home',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(appRouts)],
};
