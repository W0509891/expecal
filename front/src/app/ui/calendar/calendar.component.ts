import {Component} from '@angular/core';
import {Calendar} from "../../services/calendar-load.service"
import {Calendar_Model, Day} from "../../models/Calendar_Model"


@Component({
  selector: 'home-calendar',
  imports: [],
  styleUrl: './calendar.component.scss',
  template: `
    <div class="calendar-container">
      <div class="weekdays-row">
        @for (weekday of weekdays; track weekday) {

          <div
            [className]="(current_day.Name !== weekday)? 'weekday-item' : 'weekday-item selected-day' ">{{ weekday }}
          </div>
        }
      </div>

      <div class="weeks">
        @for (week of weeks; track week; ) {
          <div id="week-{{$index + 1}}" class="week-row">

            @for (day of week; track day.Id; ) {

              <div class="day {{day.Name}}">
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

  private ImportedCalender = new Calendar()
  private ImportedCalenderModel = new Calendar_Model(this.ImportedCalender.Year)

  protected month = this.ImportedCalenderModel.Year.getMonth(this.ImportedCalender.Month)
  protected weeks: Day[][] = [];

  protected weekdays = this.month.DayNames
  protected current_day = this.ImportedCalenderModel.getCurrentDay()

  private cal_view_days = 35


  constructor() {
    console.log("Imported Cal", this.ImportedCalender.toString())
    console.log("Imported Cal_Mod", this.ImportedCalenderModel)
    this.generateWeeks();
  }

  generateWeeks() {
    this.weeks = [];
    const days = this.month.getDays();
    const daysInWeek = 7;


    for (let i = 0; i < days.length; i += daysInWeek) {
      this.weeks.push(days.slice(i, i + daysInWeek));
    }

    this.weeks[4].push(new Day(32, this.month, []));
    this.weeks[4].push(new Day(33, this.month, []));
    this.weeks[4].push(new Day(34, this.month, []));
    this.weeks[4].push(new Day(35, this.month, []));
  }

  protected readonly String = String;
}
