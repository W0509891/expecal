import {Transaction} from "./Transaction.interface";
export interface Year {
  Id: number,
  Months: Month[],
  isLeapYear: boolean,

}

export interface Month {
  Id: number,
  Name: string,
  Year: Year,
  Weeks: number,
  Days: Day[]
  DayNames: string[]
}

export interface Day {
  Id: number
  Name: string
  Month: Month
  Transactions: Transaction[]
}
