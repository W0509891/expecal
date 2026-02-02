import {Component, inject, OnInit} from '@angular/core';
import {CalendarService} from "../../services/calendar.service"
import {Day} from '../../models/CalendarModel';
import {FiscalDayComponent} from "../fiscal-day/fiscal-day.component";
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'home-calendar',
  imports: [FiscalDayComponent],
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
              <fiscal-day [day]="day"
                          [transactions]="ts.transactions()[(day.toString('short').toString())]"
                          [class]="setDayClasses(day)" />
            }
          </div>
        }
      </div>
    </div>

  `,
})


export class CalendarComponent implements OnInit{

  //Injectables
  CalenderService: CalendarService = inject(CalendarService);
  ts:TransactionService = inject(TransactionService)

  weekdays: string[]
  weeks: Day[][] = this.CalenderService.getWeeks()
  startDay: string = this.weeks[0][0].toString("short") as string
  endDay: string = this.weeks[this.weeks.length - 1][6].toString("short") as string

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

 async ngOnInit() {
     await this.ts.fetchTransactionByRange(this.startDay, this.endDay).then(data => this.ts.transactions.set(data))
 }
}
