import { Observable } from 'rxjs';
import { User } from './user.model';
import { Injectable, inject } from '@angular/core';
// import { CommonModule} from '@angular/common';
import { HttpClient } from '@angular/common/http';
// import {HttpClient}

const USERS_API_URL = 'http://localhost:3001/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  //   private http = inject(HttpClient);
  //     constructor(private http: HttpClient){
  //     }
  
  private http = inject(HttpClient);
  
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(USERS_API_URL);
  }
  getUser(id:number):Observable<User>{
    console.log(`${USERS_API_URL}/${id}`);
    return this.http.get<User>(`${USERS_API_URL}/${id}`);
  }
  editUser(user:User):Observable<User>{
    return this.http.put<User>(`${USERS_API_URL}/${user.id}`,user);
  }

//   getAll(): User[] {
    // return [
    //   { firstName: 'marko', lastName: 'markovic', id: 1 },
    //   { firstName: 'todor', lastName: 'todorovic', id: 2 }
    //   { firstName: 'stefan', lastName: 'stefanovic', id: 3 },
    // ];
//   }


}
