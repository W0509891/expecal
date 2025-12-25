/**
 *
 */
export class Calendar_Model {
  Year: Year
  DaysInYear: number
  MonthsInYear: number
  WeeksInYear: number


  constructor(_year: number) {
    this.Year = new Year(_year)
    this.DaysInYear = (this.Year.Id % 4 === 0) ? 366 : 365
    this.MonthsInYear = 12
    this.WeeksInYear = 52
  }

  getYear(): Year {
    return this.Year
  }

  // Get the month using the (0 indexed month number)
  getMonth(month: number): Month {
    return this.Year.getMonths()[month]
  }

  getCurrentDay(): Day {
    return this.getMonth(12).getDay(11)
  }

}

/**
 *
 */
class Year {
  Id: number
  private Months: Month[]
  isLeapYear: boolean


  constructor(id: number) {
    this.Id = id
    this.Months = Array.from({length: 12}, (_, i) => new Month(i, this))
    this.isLeapYear = (this.Id % 4 === 0)
  }

  //
  getMonths(): Month[] {
    return this.Months
  }

  toString() {
    return `Year: ${this.Id}, Months: ${this.Months.length}, isLeapYear: ${this.isLeapYear}`
  }
}

/**
 *
 */
class Month {
  private Id: number
  Name: string
  private Year: Year
  Weeks: number
  private Days: Day[]
  DayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  constructor(id: number, year: Year) {
    this.Id = id
    this.Year = year
    this.Name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][id % 12]
    this.Days = Array.from({length: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][id % 12]},
      ((_, i) => new Day(i + 1, this, [])))
    this.Weeks = Math.ceil(this.Days.length / 7)
  }

  getDay(day: number): Day {
    return this.Days[day % this.Days.length]
  }

  toString() {
    return `Month: ${this.Name}, Days: ${this.Days.length}, Weeks: ${this.Weeks}`
  }

}

/**
 *
 */
export class Day {
  public Id: number
  public Name: string
  private Month: Month
  private Transactions: Transaction[]

  constructor(id: number, month: Month, transactions: Transaction[]) {
    this.Id = id
    this.Name = month.DayNames[id % 7]
    this.Month = month
    this.Transactions = transactions
  }

  getTransactions(): Transaction[] {
    return this.Transactions
  }

  toString() {
    return `Day: ${this.Id}, Month: ${this.Month.Name}`
  }
}

class Transaction {
  Timestamp: string
  Type: string
  Amount: number

  constructor(timestamp: string, type: string, amount: number) {
    this.Timestamp = timestamp;
    this.Type = type;
    this.Amount = amount;
  }
}



// const year = new Year(2025)
// const month = new Month(9, year)
// const day = new Day(1, month, [])
//
// const cyear = new Calendar_Model(year)
//
// // console.log(year)
// // console.log(month)
// // console.log(day)
// console.log(cyear.getCurrentDay())
