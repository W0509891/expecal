import {Component, computed, effect, inject, model, signal} from '@angular/core';
import {CalendarService} from "../../services/calendar.service"
import {Day} from '../../models/CalendarModel';
import {FiscalDayComponent, FiscalDescription} from "../fiscal-day/fiscal-day.component";
import {TransactionService} from '../../services/transaction.service';
import {UploadService, UploadComponent} from '../upload/upload.component';

@Component({
  selector: 'home-calendar',
  imports: [FiscalDayComponent, FiscalDescription, UploadComponent],
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
                          [class]="setDayClasses(day)"
                          (click)="dialouge(day)"
              />
            }
          </div>
        }
      </div>

      @if (show()) {
        <fiscal-description [(day)]="selectedDay"
                            [(visibility)]="show"
        />
      }

      @if (UploadService.uploadForm){ <app-upload/> }

    </div>

  `,
})


export class CalendarComponent{

  //Injectables
  CalenderService: CalendarService = inject(CalendarService);
  ts:TransactionService = inject(TransactionService)
  UploadService:UploadService = inject(UploadService)

  weekdays: string[]
  selectedDay = model.required<Day>()
  show = signal(false)
  startDay = computed(() => this.CalenderService.getWeeks()()[0][0].toString('short').toString());
  endDay = computed(() =>
    this.CalenderService.getWeeks()()[this.CalenderService.getWeeks()().length - 1][6].toString("short").toString())

  constructor() {
    //Initializers
    this.weekdays = this.CalenderService.getWeekdays() //[Sun - sat] view on display

    //TOdo preveent requests if already fetched
     effect(() => {
      const start = this.startDay();
      const end = this.endDay();

      this.ts.fetchTransactionByRange(start, end)
        .then(data => {
          this.ts.transactions.set(data)
          this.ts.fillStore();
        });
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
    if (window.innerWidth < 800) {
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
