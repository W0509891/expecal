import { Component } from '@angular/core';
import {CalendarModel} from "../../models/CalendarModel"


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
          <h3>Expense Cal</h3>
        </div>

        <div class="right">
          <div>
            <p>{{_CalendarModel.CalDate.toDateString()}}</p>
          </div>
        </div>

      </div>
    </div>

  `,
})

export class NavbarComponent {
  protected readonly _CalendarModel = CalendarModel;
}
