import {Component, signal, inject, Input, OnInit, model, computed, effect} from '@angular/core';
import {Day} from '../../models/CalendarModel';
import {Transaction} from '../../models/Transaction.interface';
import {UploadComponent} from '../upload/upload.component';
import {CalendarService} from '../../services/calendar.service';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'fiscal-day',
  imports: [],
  styleUrl: './fiscal-day.component.scss',
  template: `
    <!--Date in to left-->
    <div class="dayNumber">{{ day.getId() }}</div>


    <!--Total gain in center-->
    <div class="gain">
      <!--Todo: run calculation to display total and set color based on amt-->
      <span>
        \${{ day.totalGain() }}
      </span>
    </div>

    <!--Spend vs received at bottom-->
    <div class="minitransactions">
      <!--todo: run calculations for spending amounts-->
      <div class="dr">
        <span>Spent</span>
        <span>\${{ day.totalDebit() }}</span>
      </div>
      <div class="cr">
        <span>Received</span>
        <span>\${{ day.totalCredit() }}</span>
      </div>
    </div>
  `
})
export class FiscalDayComponent{
  // static day: number = 1
  @Input() day!: Day
  @Input() transactions!: Transaction[]

  constructor() {}

  ngOnChanges() {
    // console.log("Day has changed")
    if (this.day){
        this.day.setTransactions(this.transactions ?? [])
    }
  }
}

@Component({
  selector: "fiscal-description",
  styleUrl: `fiscal-description.scss`,
  template: `
    <div class="transaction-details-container">
      <div class="date-line">
        <!--Left Right buttons-->
        <div>
            <button (click)="prevDay()" class="btn-transparent">
              <svg class="svg">
                <use href="/assets/svg/arrow.svg"
                     transform="rotate(90, 11, 13)"
                    />
              </svg>
            </button>

            <button (click)="nextDay()" class="btn-transparent">
              <svg class="svg">
                <use href="/assets/svg/arrow.svg"
                     transform="rotate(270, 13, 14)"
                />
              </svg>
            </button>
        </div>
        <h3>{{ day().toString('short') }}</h3>
        <!--Close buttons-->
        <svg (click)="visibility.set(!visibility())" class="svg">
          <use href="/assets/svg/x.svg"/>
        </svg>
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
export class FiscalDescription {
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
    const prev_date = prev.toString("short").toString()

    if(this.ts.transaction_store[prev_date] === undefined){
      this.ts.fetchTransactionByDate(prev_date).then(data => {
        let packag = { [prev_date]: data }

        this.day().setTransactions(data)
        this.ts.fillStore(packag)
      })
    }
    else {
      prev.setTransactions(this.ts.transaction_store[prev_date])
    }
    this.day.set(prev)
  }

  nextDay(){
    const next = this.day().getNext()
    const next_date = next.toString("short").toString()
    if(this.ts.transaction_store[next_date] === undefined){
      this.ts.fetchTransactionByDate(next_date).then(data => {
        let packag = { [next_date]: data }

        this.day().setTransactions(data)
        this.ts.fillStore(packag)
      })
    }
    else {
      next.setTransactions(this.ts.transaction_store[next_date])
    }
    this.day.set(next)
  }
}

