import {Component, inject} from '@angular/core';
import {CalendarService} from "../../services/calendar.service"


@Component({
  selector: 'app-navbar',
  imports: [],
  styleUrl: './navbar.component.scss',
  template: `
    <div class="navbar-container">
      <div class="navbar">

        <div class="left">
          <a href="">Link 4</a>
          <!--        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar"-->
          <!--             class="avatar">-->
        </div>

        <div class="center">
          <button id="back" (click)="onMonthChange(-1)"><-</button>
          <h3>Expense Cal</h3>
          <button id="front" (click)="onMonthChange(1)">-></button>
        </div>

        <div class="right">
          <div>
            <p>{{CalendarService.calModel.CalDate.toDateString()}}</p>
          </div>
        </div>

      </div>
    </div>

  `,
})

export class NavbarComponent {
  CalendarService: CalendarService = inject(CalendarService);

  constructor() {}

  onMonthChange(step: number) {
    this.CalendarService.changeMonthBy(step);
  }
}
