/**
 *
 */
export class CalendarModel {
  static CalDate: Date = new Date(); //mar, jun
  Year: Year
  DaysInYear: number
  MonthsInYear: number
  WeeksInYear: number


  constructor() {
    this.Year = new Year(CalendarModel.CalDate.getFullYear())
    this.DaysInYear = (this.Year.isLeapYear) ? 366 : 365
    this.MonthsInYear = 12
    this.WeeksInYear = 52
  }

  getYear(): Year {
    return this.Year
  }


  getCurrentDay(): Day {
    return this.Year.getMonth().getDay()
  }

}

/**
 *
 */
class Year {
  Id: number
  private Months: Month[] = []
  isLeapYear: boolean


  constructor(year: number | Year) {
    //Copy constructor
    if (year instanceof Year) {
      this.Id = year.Id
      this.isLeapYear = year.isLeapYear
      this.Months = year.Months
      return
    }

    this.Id = year
    this.isLeapYear = (this.Id % 4 === 0) && (this.Id % 100 !== 0 || this.Id % 400 === 0)
    this.generateMonths()
  }

  generateMonths() {
    for (let i = 0; i < 12; i++) {
      this.Months.push(new Month(i, this))
    }
    // const months = Array.from({length: 12}, (_, i) => new Month(i, this))
  }

  //
  getMonths(): Month[] {
    return this.Months
  }


  /**
   * Retrieves the month corresponding to the given number.
   *
   * @param {number} [month=CalendarModel.CalDate.getMonth()] - The numeric representation of the month (0-11). Defaults to the current month if not provided.
   * @return {Month} The corresponding Month object from the Months array.
   */
  getMonth(month: number = CalendarModel.CalDate.getMonth()): Month {
    return this.Months[month % 12]
  }

  toString() {
    return `Year: ${this.Id}, Months: ${this.Months.length}, isLeapYear: ${this.isLeapYear}`
  }
}

/**
 * Represents a month within a year, encapsulating details such as its name, days, weeks, and associated utility methods.
 */
class Month {
  private Id: number
  Name: string
  private Year: Year
  Weeks: number
  private Days: Day[]
  private readonly StartDay: number
  DayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  constructor(id: number, year: Year) {
    this.Id = id
    this.Year = year
    this.Name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][id % 12]
    this.Days = Array.from({length: [31, ((year.isLeapYear) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][id % 12]},
      ((_, i) => new Day(i + 1, this, [])))
    this.Weeks = Math.ceil(this.Days.length / 7)
    this.StartDay = (new Date(year.Id, id, 1)).getDay()
  }

  //Returns all the days of the month
  getDays(): Day[] {
    return this.Days
  }

  /**
   * Retrieves the corresponding Day object for the provided day number.
   *
   * @param {number} [day=CalendarModel.CalDate.getDate()] - The numeric value of the day.
   *        Defaults to the current date retrieved from CalendarModel.CalDate.getDate().
   * @return {Day} The Day object corresponding to the given day number.
   */
  getDay(day: number = CalendarModel.CalDate.getDate()): Day {
    return this.Days[day % this.Days.length - 1]
  }

  // retrieves the first day of the month Object
  getFirstDay(): Day {
    return this.Days[this.StartDay]
  }

  // retrieves the first day of the week
  getStartDay(): number{
    return this.StartDay
  }

  getId(): number {
    return this.Id
  }
  toString() {
    return `Month: ${this.Name}, Days: ${this.Days.length}, Weeks: ${this.Weeks} StartDay: ${this.StartDay}`
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
// const cyear = new CalendarModel(year)
//
// // console.log(year)
// // console.log(month)
// // console.log(day)
// console.log(cyear.getCurrentDay())
