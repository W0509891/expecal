import {Transaction} from "./Transaction";

/**
 * Represents a calendar model that manages year, month, and day operations.
 * Provides static methods for date manipulation and instance methods for year-related operations.
 */
export class CalendarModel {
  CalDate: Date = new Date ()  // represents the current date
  private Year: Year                 // represents the current year and its associated months
  DaysInYear: number                 // number of days in the current year
  MonthsInYear: number               // number of months in the current year
  WeeksInYear: number                // number of weeks in the current year

  /**
   * Creates a new CalendarModel object with the given year, month, and day.
   * If no arguments are provided, the current date is used.
   * @param year
   * @param month 0 - 11 [Jan - Dec]
   * @param day 1 - 31 [1st - 31st]
   */
  constructor() {
    this.Year = new Year(this.CalDate.getFullYear())
    this.DaysInYear = (this.Year.isLeapYear()) ? 366 : 365
    this.MonthsInYear = 12
    this.WeeksInYear = 52
  }

  /**
   * @return {Year} The year associated with this instance.
   */
  getYear(): Year {
    return this.Year
  }

  /**
   * Sets the year by creating a new Year object with the provided value.
   *
   * @param {number} year - The year value to be set.
   */
  setYear(year: number) {
    this.Year = new Year(year)
  }


  /**
   * Retrieves the month corresponding to the given number.
   *
   * @param {number} [month=CalendarModel.CalDate.getMonth()] - The numeric representation of the month (0-11). Defaults to the current month if not provided.
   * @return {Month} The corresponding Month object from the Months array.
   */
  getMonth(month: number = this.CalDate.getMonth()): Month {
    return this.Year.getAllMonths()[month % 12]
  }


  /**
   * Retrieves the corresponding Day object for the provided day number.
   *
   * @param {number} [day=CalendarModel.CalDate.getDate()] - The numeric value of the day. 1 - 31
   *   Note if <= 0 will return current day
   *
   * @return {Day} The Day object corresponding to the given day number.
   */
  getDay(day?: number): Day {
    if (day && day >= 1) {
      return this.getMonth().getDays()[(day - 1) % this.getMonth().getDays().length]
    }
    return this.getMonth().getDays()[this.CalDate.getDate() - 1]
  }

  /**
   * Adjusts the current month of the calendar by the specified number of months.
   *
   * @param {number} num - The number of months to add or subtract.
   */
  changeMonthBy(num: number) {
    const c = this.CalDate
    // c.setMonth(c.getMonth() + num)
    this.CalDate = new Date(c.getFullYear(), c.getMonth() + num, c.getDate())
  }


  setNewDate(year: number, month: number = 0, day: number = 1) {
    this.CalDate = new Date(year, month, day)
  }


  getDateAsString() {
    return this.CalDate.toDateString()
  }

  static isLeapYear(year: number) {
    return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
  }

}

/**
 * Represents a year and its associated months
 */
class Year {
  private readonly Id: number             // Year represented as a number
  private readonly Months: Month[] = []   // Array of Month objects representing the months of the year


  constructor(year: number | Year) {
    //Copy constructor
    if (year instanceof Year) {
      this.Id = year.Id
      this.isLeapYear = year.isLeapYear
      this.Months = year.Months
      return
    }

    this.Id = year
    this.generateMonths()
  }

  /**
   * Generates an array of Month objects representing the months of the year.
   */
  generateMonths() {
    for (let i = 0; i < 12; i++) {
      this.Months.push(new Month(i, this.Id, this.isLeapYear()))
    }
  }

  /**
   * Returns the numeric representation of the year.
   */
  getId(): number {
    return this.Id
  }

  /**
  * Returns if is a leap year.
  */
  isLeapYear(): boolean{
    return CalendarModel.isLeapYear(this.Id)
  }

  /**
   * Returns an array of all the months of the year.
   */
  getAllMonths(): Month[] {
    return this.Months
  }


  /**
   * @return a representation of the object
   */
  toString(): string {
    return `Year: ${this.Id}, Months: ${this.Months.length}, isLeapYear: ${this.isLeapYear()}`
  }
}

/**
 * Represents a calendar month including its days, name, start day, and other characteristics.
 */
export class Month {
  private readonly Id: number         // numeric representation of the month (0 - 11)
  private readonly Name: string       // name of the month (January, February, etc.)
  private readonly Year: number       // year of the month
  protected Weeks: number             // number of weeks in the month
  private readonly Days: Day[]        // days in the month represented by an array of Day objects
  private readonly StartDay: number   // day of the week that the month starts on
  static readonly DayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  constructor(id: number, year: number, isLeap: boolean) {
    this.Id = id
    this.Year = year
    this.Name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][id % 12]
    this.Days = Array.from(
      {length: [31, ((isLeap) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][id % 12]},
      ((_, i) => new Day(i + 1, this, [])))
    this.Weeks = Math.ceil(this.Days.length / 7)
    this.StartDay = (new Date(this.Year, id, 1)).getDay()

  }


  /**
   * Returns the numeric representation of the month (0 - 11).
   */
  getId(): number {
    return this.Id
  }

  /**
   * Returns the year of the month.
   */
  getYear(): number {
    return this.Year
  }

  /**
   * Returns the name of the month.
   */
  getName(): string {
    return this.Name
  }

  /**
   *  Returns the number of weeks in the month.
   */
  getWeeks(): number {
    return this.Weeks
  }

  /**
   * Returns the number of days in the month.
   */
  getNoOfDays(): number {
    return this.Days.length
  }

  /**
   * Returns all the days of the month
   * @return {Day[]}*/
  getDays(): Day[] {
    return this.Days
  }


  /**
   * retrieves the first day of the week
   */
  getStartDay(): number {
    return this.StartDay
  }


  /**
   * returns a representation of the object
   *
   * @param format the format of return type "obj" for object notation
   */
  toString(format?: string) {
    if (format === 'obj') {
      return {Name: this.Name, Days: this.Days.length, Weeks: this.Weeks, StartDay: this.StartDay}
    }
    return `Month: ${this.Name}, Days: ${this.Days.length}, Weeks: ${this.Weeks} StartDay: ${this.StartDay}`
  }

}

/**
 * Represents a Day within a Month and includes its associated transactions.
 */
export class Day {
  private Id: number                    // numeric representation of the day (1 - 31)
  private Name: string = ""             // name of the day (Sunday, Monday, etc.)
  private Month: Month                  // Month object that the day belongs to
  private Transactions: Transaction[]   // array of transactions associated with the day


  constructor(id: number, month: Month, transactions: Transaction[]) {
    this.Id = id
    this.Name = Month.DayNames[id % 7]
    this.Month = month
    this.Transactions = transactions
  }

  /*Returns the numeric representation of the day*/
  getId(): number {
    return this.Id
  }

  /*Returns the name of the day*/
  getName(): string {
    return this.Name
  }

  /**
   * Returns an array of all the transactions associated with the day
   * @return {Transaction[]}
   */
  getTransactions(): Transaction[] {
    return this.Transactions
  }

  /**
   * Returns the Month object associated with the Day.
   */
  getMonth(): Month {
    return this.Month
  }

  /**
   * returns a representation of the object
   *
   * @param format the format of return type "obj" for object notation
   *
   */
  toString(format?: string) {
    if (format === 'obj') {
      return {Id: this.Id, Name: this.Name, Month: this.Month.getName, Transactions: this.Transactions}
    }

    return `Day: ${this.Id}, Month: ${this.Month.getName()}`
  }
}


