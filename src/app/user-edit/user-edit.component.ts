import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../service/users.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { delay } from 'rxjs';

// templateUrl: './user-edit.component.html',
@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule,UserFormComponent],
  template: `
    <p *ngIf="!user">Loading...</p>
    <!-- {{user | json}} - iz edit komponente -->
    <!-- <app-user-form *ngIf="user" [user]="user" [user1]="user" (eventEmiter)="saveUpdated($event)"></app-user-form> -->
    <app-user-form *ngIf="user" [user]="user" (eventEmiter)="saveUpdated($event)"></app-user-form>
  `,
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit{
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  // id!:string;
  id!:number;
  user!:User;
  
  ngOnInit(): void {
    //params je observable i emitovace vrednost svaki put kada se promeni neki od parametara rute
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.usersService.getUser(this.id).subscribe(u=>this.user = u);
  }
 
  saveUpdated(user:User){
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.adress = user.adress;
    if(user.aliases.length!=null && user.aliases.length>=1){
      this.user.aliases = user.aliases;
      console.log("ima alijase");
    }
    // TODO: refresh stranice
    this.usersService.editUser(this.user).pipe(delay(500)).subscribe(()=>window.location.reload());
  }

  
  // keyUp(event:any):void{
  //   let lname = event.target.value; 
  //   console.log(lname);
  //   this.user.lastName = lname;
  // }
  
  // stampaj(txt:string):void{
  //   console.log(txt);
  // }
  // saveChanges():void{
  //   //1. nacin
  //   let fname = (<HTMLInputElement>document.getElementById("firstname")).value;
  //   console.log(fname);
  //   // let lname = 
  //   this.user.firstName = fname;
  //   this.usersService.editUser(this.user).subscribe(()=>console.log("uspesno sacuvano"));
  // }
}
