import {Component, inject} from '@angular/core';
import {CalendarService} from "../../services/calendar.service"
import {SidebarService} from "../sidebar/sidebar.component"
import {UploadService} from "../upload/upload.component"
import {FormControl, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-navbar',
  imports: [ReactiveFormsModule],
  styleUrl: './navbar.component.scss',
  template: `
    <div class="navbar-container">
      <div class="navbar">

        <div class="left">
          <svg (click)="SidebarService.showNav()" class="svg">
            <use href="/assets/svg/hamburger.svg#icon"></use>
          </svg>
        </div>

        <div class="center">
          <h3>Expense Cal</h3>
        </div>

        <div>
            <button (click)="UploadService.showUploadForm()" id="upload">Upload</button>
        </div>

        <div class="right">
          <button id="back" (click)="onMonthChange(-1)">
            <svg class="svg">
              <use href="/assets/svg/arrow.svg" transform="rotate(90 11 13)"></use>
            </svg>
          </button>
          <div>
            <input type="date"
                   class="date-picker"
                   (focus)="dateClick($event.target)"
                   (change)="changeDate(formDate.value)"
                   [formControl]="formDate"
            >
<!--            <p>{{CalendarService.calModel.CalDate.toDateString()}}</p>-->
          </div>
          <button id="front" (click)="onMonthChange(1)">
            <svg class="svg">
              <use href="/assets/svg/arrow.svg" transform="rotate(270 13 13)"></use>
            </svg>
          </button>
        </div>

      </div>
    </div>

  `,
})

export class NavbarComponent {
  CalendarService: CalendarService = inject(CalendarService);
  SidebarService: SidebarService = inject(SidebarService)
  UploadService: UploadService= inject(UploadService)

  formDate = new FormControl(this.CalendarService.getCurrent_day()!!.toString('short') as string)

  constructor() {}

  changeDate(formDate: string|null) {
    const [year, month, day] = formDate?.split('-') as [string, string, string]
    this.CalendarService.setNewDate(Number(year),Number(month), Number(day))
  }
  onMonthChange(step: number) {
    this.CalendarService.changeMonthBy(step);
    this.formDate.setValue(this.CalendarService.getCurrent_day()!!.toString('short') as string);
  }

  dateClick(event: any) {
    console.log(event)
    if (event.showPicker) {
      try {
        event.showPicker()
      }
      catch (e:any) {
        console.error("Error: " + e.message);
      }
    }
  }
}
