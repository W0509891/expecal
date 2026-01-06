import {Component, inject} from '@angular/core';
import {CalendarService} from "../../services/calendar.service"
import {SidebarService} from "../../ui/sidebar/sidebar.component"


@Component({
  selector: 'app-navbar',
  imports: [],
  styleUrl: './navbar.component.scss',
  template: `
    <div class="navbar-container">
      <div class="navbar">

        <div class="left">
          <div (click)="onClicked()">
            <img src="/assets/svg/hamburger.svg">
          </div>
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
  SidebarService: SidebarService = inject(SidebarService)

  constructor() {}

  onClicked() {
    this.SidebarService.toggle()
  }
  onMonthChange(step: number) {
    this.CalendarService.changeMonthBy(step);
  }
}
