import {Transaction} from '../models/Transaction.interface';
import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TransactionService {
  private readonly api_key: string = "http://localhost:8000/transactions"

  transaction_store: Record<string, Transaction[]> = {}
  transactions = signal<Record<string, Transaction[]>>({})

  constructor() {
  }

  async fetchTransactionByDate(date: string): Promise<Transaction[]> {
    const response = await fetch(`${this.api_key}?date_on=${date}`)

    return await response.json()
  }

  async fetchTransactionByRange(from: string, to: string): Promise<Record<string, Transaction[]>> {
    const response = await fetch(`${this.api_key}?date_from=${from}&date_to=${to}`)
    return await response.json()
  }

  fillStore(data?: object){
    if (Object.keys(this.transaction_store).length === 0) {
      console.log("empty store")
      this.transaction_store = this.transactions();
    }

    else {
      console.log("not empty store")
      this.transaction_store = {...this.transaction_store, ...data};
    }
    console.log(this.transaction_store)

  }
}

