import {Component} from '@angular/core';
import {CalendarModel, Day} from "../../models/CalendarModel"


@Component({
  selector: 'home-calendar',
  imports: [],
  styleUrl: './calendar.component.scss',
  template: `
    <div class="calendar-container">
      <div class="weekdays-row">
        @for (weekday of weekdays; track weekdays[$index]) {

          <div [className]="(current_day.Name !== weekday)? 'weekday-item' : 'weekday-item selected-day' ">
            {{ weekday }}
          </div>
        }
      </div>

      <div class="weeks">
        @for (week of weeks; track week; ) {
          <div id="week-{{$index + 1}}" class="week-row">

            @for (day of week; track day.Id; ) {

              <div [className]="(day.Id !== 0)? 'day': 'day zero' ">
                <div class="day-item">{{ day.Id }}</div>
              </div>
            }
          </div>
        }
      </div>
    </div>

  `,
})


export class CalendarComponent {

  private ImportedCalenderModel = new CalendarModel()

  protected month = this.ImportedCalenderModel.Year.getMonth()
  protected weeks: Day[][] = [];

  protected weekdays = this.month.DayNames
  protected current_day = this.ImportedCalenderModel.getCurrentDay()

  private cal_view_days = 35


  constructor() {
    // console.log("Imported Cal_Mod", this.ImportedCalenderModel)
    console.log("Imported Cal_Mod month", this.month)
    this.generateWeeks();
    console.log(this.weeks)
    console.log(this.month.getFirstDay())
    window.addEventListener('resize', () => {
      this.screenChange()
    })

  }

  generateWeeks() {
    this.weeks = [];
    const days = this.month.getDays();

    const weekday = this.month.getStartDay();
    const daysInWeek = 7;
    const daysleft: number = (35 - (days.length + weekday) >= 0) ? 35 - (days.length + weekday) : 6


    console.log("weekday", weekday, this.weekdays[weekday])

    //Padding for front
    for (let i = weekday; i > 0; i--) {
      days.unshift(new Day(0, this.month, []));
    }

    for (let i = 0; i < days.length; i += daysInWeek) {
      this.weeks.push(days.slice(i, i + daysInWeek));
    }

    console.log("days left", daysleft)

    //Padding for back
    for (let i = 0; i < daysleft; i++) {
      this.weeks[this.weeks.length - 1].push(new Day(0, this.month, []));
    }
  }


  screenChange() {
    // console.log("screen change", window.innerWidth)
    if (window.innerWidth < 768) {
      this.weekdays = this.weekdays.map(item =>
        item.substring(0, 3)
      )
    } else {
      this.weekdays = this.month.DayNames
    }
  }
}
