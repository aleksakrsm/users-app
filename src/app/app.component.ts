import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { UsersComponent } from './users/users.component';
import { RouterOutlet } from '@angular/router';
import { Observable, filter, interval, map, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, UsersComponent,RouterOutlet],
  template: `
    <app-header></app-header>
    
    <div class="body">
      <!-- <app-users></app-users> -->
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // a: any = 4;

  constructor() {
    // const numbers$ = interval(2_000);
    // const evenNumbers$ = numbers$.pipe(filter((i) => i % 2 === 0));
    // evenNumbers$.subscribe((x) => console.log(x));

    // const numbersGreaterThanTen$ = numbers$.pipe(
    //   map((i) => i + 1),
    //   filter((i) => i > 10)
    // );

    // 1 primer sa pipe
    // const brojevi$ = interval(2000).pipe(
    //   tap((x) => console.log(x))
    // );
    // const subscription1 = brojevi$.subscribe();
    // setTimeout(() => {
    //   subscription1.unsubscribe()
    // }, 10000);

    //2 primer sa Observer
    // const brojevi$ = interval(2000);
    // const subscription1 = brojevi$.subscribe({
    //   next: (x) => console.log(x),
    //   complete: () => console.log('gotovo!'),
    //   error: (err) => console.log(err)
    // });
    // setTimeout(() => {
    //   subscription1.unsubscribe();
    // }, 6000);


    // primer 3 sa take
    // const brojevi$ = interval(2000);
    // const subscription1 = brojevi$.pipe(take(2)).subscribe({
    //   next: (x) => console.log(x),
    //   complete: () => console.log('gotovo!'),
    //   error: (err) => console.log(err)
    // }); 
    // setTimeout(() => {
    //   subscription1.unsubscribe();
    // }, 6000);
   
    // primer 4 sa setInterval neblokirajuce
    // const mojObservable$ = new Observable<number>(
    //   (observer)=>{
    //     observer.next(2);
    //     observer.next(4);
    //     observer.next(6);
    //     setTimeout(() => {
    //       observer.next(1)
    //     }, 5000);
    //     observer.complete();
    //   }
    // );
    // const subscription2 = mojObservable$.subscribe({
    //   next: (x) => console.log(x),
    //   complete: () => console.log('gotovo!'),
    //   error: (err) => console.log(err)
    // });
  }
}

// IMPERATIVNO!!!
// let count = 0;
// setInterval(() => {
//   count++;
//   if (count % 2 === 0) {
//     console.log('m');
//   }
// }, 2_000);

// var b = 5;
// const y = 4;
// let c = 6;
