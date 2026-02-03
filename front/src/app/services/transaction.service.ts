import {Transaction} from '../models/Transaction.interface';
import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TransactionService {
  private readonly api_key: string = "http://localhost:8000/transactions"

  transaction_store = signal<Transaction[]>([])
  transactions = signal<Record<string, Transaction[]>>({})

  constructor() {
  }

  async fetchTransactionByDate(date: string): Promise<Transaction> {
    const response = await fetch(`${this.api_key}?date_on=${date}`)

    return await response.json()
  }

  async fetchTransactionByRange(from: string, to: string): Promise<Record<string, Transaction[]>> {
    const response = await fetch(`${this.api_key}?date_from=${from}&date_to=${to}`)
    return await response.json()
  }
}

