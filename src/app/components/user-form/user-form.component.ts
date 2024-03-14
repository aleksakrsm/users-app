import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { User } from 'src/app/model/user.model';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {myPatternValidator, uniqueAliasValidator } from 'src/app/myValidators/myCustomValidatorFunctions';
// import { uniqueAliasControlValidator, uniqueAliasValidator } from 'src/app/myValidators/myCustomValidatorFunctions';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit{
  //   formGroup = new FormGroup({
  //     firstName: new FormControl("",{nonNullable:true, validators:[Validators.required]}),
  //     lastName: new FormControl("",{nonNullable:true, validators:[Validators.required]}),
  //     adress: new FormGroup({town: new FormControl("",{nonNullable:true,validators:[Validators.required,Validators.pattern('')]}),
  //   zipcode: new FormControl("",{nonNullable:true,validators:[Validators.required]})})
  // });
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.numOfAliasses = this.myUser.aliases.length;
    this.loadAllInitialAliasControls(this.myUser.aliases);
    // console.log("broj alijasa (form kontrola): "+(this.formGroup.get('aliases') as FormArray).length);
  }
  stampaj():void {
    console.log("broj alijasa (form kontrola): "+(this.formGroup.get('aliases') as FormArray).length)
  }
  public numOfAliasses!:number;
  user_id?: number;
  myUser:User = {adress:{town:"",zipcode:""},aliases:[],firstName:'',lastName:'',id:0};
  @Output() eventEmiter = new EventEmitter();
  @Input() isSaving = false;

  @Input() set user({id,firstName,lastName,adress = { town: 'n/a', zipcode: 'n/a' },aliases}: User) {
    this.user_id = id;
    this.myUser.id = id;
    this.myUser.firstName = firstName;
    this.myUser.lastName = lastName;
    this.myUser.adress = adress;
    this.myUser.aliases = aliases;

    // this.formGroup.setValue({firstName:firstName,lastName:lastName,adress:adress,aliases:aliases});
    this.formGroup.patchValue({
      firstName: firstName,
      lastName: lastName,
      adress: adress,
    });
  }
  formGroup = this.formBuilder.group({
    firstName: ['', { nonNullable: true, validators: [Validators.required,Validators.pattern("^(?!.*n\/a).*$")] }],
    lastName: ['', { nonNullable: true, validators: [Validators.required,Validators.pattern("^(?!.*n\/a).*$")] }],
    adress: this.formBuilder.group({
      town: ['', { nonNullable: true, validators: [Validators.required,Validators.pattern("^(?!.*n\/a).*$")] }],
      zipcode: ['', { nonNullable: true, validators: [Validators.required,Validators.pattern("^(?!.*n\/a).*$")] }],
    }),
    // aliases: this.formBuilder.array([],{validators:[]}),
    aliases: this.formBuilder.array([],{validators:[uniqueAliasValidator()]}),
  });

  private loadAllInitialAliasControls(aliases:string[]): void {
    aliases.forEach(element => {
      this.addAlias(element);
    });
  }


  get aliases(){
    return this.formGroup.get('aliases') as FormArray;
  }
  addAlias(alias:string) {
    this.aliases.push(this.formBuilder.control(alias,
      {validators:[
        Validators.required,
        Validators.pattern("^(?!.*n\/a).*$"),
        myPatternValidator(/^[A-Z][a-zA-Z]{2,19}$/)
      ]}));
  }

  onSave(): void {
    let userFormValue = this.formGroup.getRawValue();
    let newAliases : string[]=[];
    // newAliases = (userFormValue.aliases as string[]).filter(alias=>{ 
    //   alias=alias.toLocaleLowerCase();
    //   this.myUser.aliases.
    //  });
    // userFormValue.aliases.forEach(alias => {
    //   if(!this.myUser.aliases.includes(alias+""))
    //       newAliases.push(alias+"");
    // }); 
    // userFormValue.aliases = [...newAliases,...this.myUser.aliases];
    this.eventEmiter.emit({ ...userFormValue, id: this.user_id });
    // this.eventEmiter.emit(this.formGroup.value);
    //  this.formGroup.valueChanges;
  }
}
