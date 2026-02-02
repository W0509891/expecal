import {Component, signal, inject, Input, OnInit} from '@angular/core';
import {Day} from '../../models/CalendarModel';
import {Transaction} from '../../models/Transaction.interface';
import {TransactionService} from '../../services/transaction.service';
// import {TransactionService} from "../../services/transaction.service";

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
        <span>Recived</span>
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
    if (this.day){
        console.log(this.day.toString("short"), this.transactions)
        this.day.setTransactions(this.transactions ?? [])
    }
  }
}
