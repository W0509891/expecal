import {Component, inject} from '@angular/core';
import {CalendarService} from "../../services/calendar.service"
import {Day} from '../../models/CalendarModel';


@Component({
  selector: 'home-calendar',
  imports: [],
  styleUrl: './calendar.component.scss',
  template: `
    <div class="calendar-container">
      <div class="weekdays-row">
        @for (weekday of weekdays; track weekdays[$index]) {

          <div class="weekday-item">{{ weekday }}</div>
        }
      </div>

      <div class="weeks">
        @for (week of CalenderService.getWeeks(); track $index; ) {
          <div id="week-{{$index + 1}}" class="week-row">

            @for (day of week; track day.getId(); ) {

              <div [class]="setDayClasses(day)">
                <div class="day-item">{{ day.getId() }}</div>
              </div>
            }
          </div>
        }
      </div>
    </div>

  `,
})


export class CalendarComponent {

  CalenderService: CalendarService = inject(CalendarService);
  weekdays: string[]

  constructor() {
    //Initializers
    this.weekdays = this.CalenderService.getWeekdays() //[Sun - sat] view on display

    //Event Listeners
    window.addEventListener('resize', () => {
      this.screenChange()
    })

  }

  /*----------------UI RELATED FUNCTIONS---------------*/
  setDayClasses(day:Day):object{
    return {
      'day':true, //General class for all days
      'zero': day.getMonth() !== this.CalenderService.getMonth(), // Class if the day is not in the current month
      'selected-day': day === this.CalenderService.getCurrent_day() // Class if the day is the current day
    }
  }


  screenChange() {
    console.log("screen change", window.innerWidth)
    if (window.innerWidth < 768) {
      //Cut weekdays to 3 letters
      this.weekdays = this.weekdays.map(item => item.substring(0, 3))
    }

    else {
      //Restore weekdays to full names
      this.weekdays = this.CalenderService.getWeekdays()
    }
  }

  protected readonly Day = Day;
}
