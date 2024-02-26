import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit{
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  id!:string;
  user!:User;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.usersService.getUser(Number.parseInt(this.id)).subscribe(u=>this.user = u);
  }
  
  saveChanges():void{
    //1. nacin
    let fname = (<HTMLInputElement>document.getElementById("firstname")).value;
    console.log(fname);
    // let lname = 
    this.user.firstName = fname;
    this.usersService.editUser(this.user).subscribe(()=>console.log("uspesno sacuvano"));
  }
  
  keyUp(event:any):void{
    //2. nacin
    let lname = event.target.value;
    console.log(lname);
    this.user.lastName = lname;
  }

}
