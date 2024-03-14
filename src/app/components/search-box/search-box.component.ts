import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, tap } from 'rxjs';


@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,JsonPipe],
  // <input type="text" placeholder="Search term..." [formControl] = "formControl" (keyup)="onChange()">
  // [disabled]="false"
  template: `
    <input
      id="searchBox"
      type="text"
      placeholder="Search term..."
      [formControl]="formControl"
    />
    <br />
    <div *ngIf="formControl.errors?.['required']">Term is required.</div>
    <div *ngIf="formControl.errors?.['minlength']">Term is too short.</div>
    <br />
    <input
      type="button"
      value="dugme"
      (click)="naKlik()"
      [disabled]="!formControl.valid"
    />
    <div>Is form valid? {{ formControl.valid }}</div>
    <div>
      Term:
      <input
        type="text"
        disabled="true"
        [value]="formControl.valueChanges | async"
        />
      </div>
      `,
  styleUrls: ['./search-box.component.scss'],
})
// [value]="formControl.valueChanges.pipe(debounceTime(500)) | async"
// [value]="formControl.valueChanges.subscribe()"
// [value]="formControl.valueChanges.pipe(map(x=>console.log(x))).subscribe()"
export class SearchBoxComponent implements OnInit {
  // formControl: FormControl = new FormControl('');
  formControl: FormControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  //     1. nacin
  // @Output() newTerm: EventEmitter<string> = new EventEmitter();
  ngOnInit(): void {
    //   this.formControl.valueChanges.pipe(
    //     debounceTime(1000),
    //     distinctUntilChanged(),
    //     tap((x)=>console.log(`pipe-tap-${x}`))
    //     ).
    //     subscribe((x) => {
    //       this.newTerm.emit(x);
    //       console.log(x);
    //     });
  }

  naKlik(): void {
    // console.log('sad');
    this.formControl.setValue("klik");
  }
  //     2. nacin
  @Output() newTerm = this.formControl.valueChanges.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    tap((x) => console.log(`pipe-tap-${x}`))
  );

  // onChange(): void {
  //   this.formControl.valueChanges.subscribe((x) => console.log(x));
  // }
}
