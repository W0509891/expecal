import {Component, computed, effect, inject} from '@angular/core';
import {CalendarService} from "../../services/calendar.service"
import {Day} from '../../models/CalendarModel';
import {FiscalDayComponent} from "../fiscal-day/fiscal-day.component";
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: "fiscal-description",
  styleUrl: `calendar.component2.scss`,
  template: `
    <div class="transaction-details-container">
      <div class="date-line">
        <div>
            <button (click)="prevDay()">&lt;</button>
            <button (click)="nextDay()">&gt;</button>
        </div>
        <h3>{{ day().toString('short') }}</h3>
        <button (click)="visibility.set(!visibility())">Close</button>
      </div>

      <div class="transaction-table">
        <div class=" header trow">
          <h4 class="tcol1">Description</h4>
          <div class="tcolspan">
            <h4 class="tcol2">DR</h4>
            <h4 class="tcol3">CR</h4>
          </div>
        </div>
        @for (transaction of day().getTransactions(); track transaction.id) {
          <div class="transaction-details trow">
            <p class="tcol1">{{ transaction.description }}</p>
            <div class="tcolspan">
              <p [class]="trType(transaction.amount)">
              {{ transaction.amount }}
              </p>
            </div>
          </div>
        }
        <div class=" total trow">
          <h4 class="tcol1">{{day().totalGain()}}</h4>
          <div class="tcolspan">
            <h4 class="tcol2">{{day().totalDebit()}}</h4>
            <h4 class="tcol3">{{day().totalCredit()}}</h4>
          </div>
        </div>
        </div>
    </div>`
})
export class FiscalDiscription{
  ts:TransactionService = inject(TransactionService)

  day=  model.required<Day>();
  visibility = model<boolean>();
  trType = (amount: number):string => {
    if(amount < 0){
      return "tcol2"
    }
    return "tcol3"
  }

  ngOnInit(){
    // console.log(this.day())
  }

  prevDay(){
    const prev = this.day().getPrev()
    prev.setTransactions(this.ts.transactions()[prev.toString("short").toString()])
    this.day.set(prev)
  }

  nextDay(){
    const next = this.day().getNext()
    next.setTransactions(this.ts.transactions()[next.toString("short").toString()])
    this.day.set(next)
  }
}


@Component({
  selector: 'home-calendar',
  imports: [FiscalDayComponent, FiscalDiscription],
  styleUrl: './calendar.component.scss',
  template: `
    <div class="calendar-container">
      <div class="weekdays-row">
        @for (weekday of weekdays; track weekdays[$index]) {

          <div class="weekday-item">{{ weekday }}</div>
        }
      </div>

      <div class="weeks">
        @for (week of CalenderService.getWeeks()(); track $index; ) {
          <div id="week-{{$index + 1}}" class="week-row">

            @for (day of week; track day.getId(); ) {
              <fiscal-day [day]="day"
                          [transactions]="ts.transactions()[(day.toString('short').toString())]"
                          [class]="setDayClasses(day)" />
            }
          </div>
        }
      </div>

      @if (show()) {
        <fiscal-description [(day)]="selectedDay"
                            [(visibility)]="show"
        />
      }

    </div>

  `,
})


export class CalendarComponent{

  //Injectables
  CalenderService: CalendarService = inject(CalendarService);
  ts:TransactionService = inject(TransactionService)

  weekdays: string[]
  selectedDay = model.required<Day>()
  show = signal(false)
  startDay = computed(() => this.CalenderService.getWeeks()()[0][0].toString('short').toString());
  endDay = computed(() =>
    this.CalenderService.getWeeks()()[this.CalenderService.getWeeks()().length - 1][6].toString("short").toString())

  constructor() {
    //Initializers
    this.weekdays = this.CalenderService.getWeekdays() //[Sun - sat] view on display

     effect(() => {
      const start = this.startDay();
      const end = this.endDay();

      this.ts.fetchTransactionByRange(start, end)
        .then(data => this.ts.transactions.set(data));
    });

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

  dialouge(e: Day){
    if(e){
      this.selectedDay.set(e)
    }
    this.show.set(!this.show())

  }
}
