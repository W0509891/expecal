import {Component, inject, Input, OnInit} from '@angular/core';
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
        \${{this.day.totalGain() }}
      </span>
    </div>

    <!--Spend vs received at bottom-->
    <div class="minitransactions">
      <!--todo: run calculations for spending amounts-->
      <div class="dr">
        <span>Spent</span>
        <span>\${{this.day.totalDebit()}}</span>
      </div>
      <div class="cr">
        <span>Recived</span>
        <span>\${{this.day.totalCredit()}}</span>
      </div>
    </div>
  `
})
export class FiscalDayComponent implements OnInit{
  // static day: number = 1
  @Input() day!: Day
  // transactions: Transaction[] = []
  transactionService = inject(TransactionService)
  constructor() {



  }

  ngOnInit() {

    if (this.day){
      this.transactionService.fetchTransactions(this.day!.toString("short") as string).then(data => this.day.setTransactions(data))

    }
  }
}
