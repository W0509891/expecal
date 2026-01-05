import {Transaction} from '../models/Transaction.interface';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TransactionService {
  static Counter: number = 0
  api_key: string = "http://localhost:8000/transactions"

  Transactions: Transaction[] = []
  // fetched: boolean = false

  constructor() {}


  async fetchTransactions(date: string):Promise<Transaction[]>{

    console.log(++TransactionService.Counter, "Api call made")
    const response = await fetch(`${this.api_key}?date=${date}`)

    return await response.json()


  }



  filterByDate(filter: string): Transaction[] {

    // const transactions = async() => await this.fetchTransactions()

    let dateSet: Set<any> = new Set()

    // console.log(transactions)
    this.Transactions.forEach(transaction => {
      dateSet.add(transaction.date)
    })

    let dates: string[] = Array.from(dateSet)

    let filteredDates: Record<string, Transaction[]> = {}

    for (let date of dates) {
      filteredDates[date] = this.Transactions.filter(transaction => transaction.date === date)
    }

    // console.log("Filtered dates" ,filteredDates[dates[1]])
    return filteredDates[filter]
  }
}

