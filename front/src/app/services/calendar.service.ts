import {Injectable, signal} from '@angular/core';
import {CalendarModel, Day, Month} from "../models/CalendarModel";

@Injectable({providedIn: 'root'})

export class CalendarService {

  public calModel: CalendarModel = new CalendarModel()
  protected _year
  protected _month: Month
  protected _current_day: Day
  protected _weeks = signal<Day[][]>([])
  protected _weekdays: string[]

  protected _cal_view_days: number = 0

  constructor() {
    this._year = this.calModel.getYear();
    this._month = this.calModel.getMonth();
    this._current_day = this.calModel.getDay();
    this._weekdays = Month.DayNames;
    this.generateMonthView();
  }

  /**
   * Generates the array size based on the month start day.
   */
  generateArraySize() {
    //Checks if it starts on a fri/sat & if the month is not feb and is more than 30 days
    switch (this._month.getNoOfDays()) {
      case 31:
        this._cal_view_days = (this._month.getStartDay() > 4) ? 42 : 35
        return

      case 30:
        this._cal_view_days = (this._month.getStartDay() === 6)? 42 : 35
        return

      default:
        this._cal_view_days = 35
        return;
    }
  }

  /**
   * Generates the month view based on the current month object.
   */
  generateMonthView() {
    this.generateArraySize()

    let monthView = []
    const days = this._month.getDays();
    const startDay = this._month.getStartDay();

    //last month from the previous year or previous month in the same year
    const previousMonth = this._month.getId() === 0 ?
      new Month(11, this._year.getId() - 1, CalendarModel.isLeapYear(this._year.getId() - 1)) :
      this.calModel.getMonth(this._month.getId() - 1);

    //first month in next year or next month in the same year
    const nextMonth = this._month.getId() === 11 ?
      new Month(0, this._year.getId() + 1, CalendarModel.isLeapYear(this._year.getId() + 1)) :
      this.calModel.getMonth(this._month.getId() + 1);


    //Fills the array with days from the previous month
    for (let j = 0; j < startDay; j++) {
      // noOfDays in prev month less curr month start index + n to get days of prev month
      monthView[j] = previousMonth.getDays()[previousMonth.getNoOfDays() - startDay + (j)] //chnge to no of days
    }

    //Fills the array with days in the current month
    days.forEach((day, index) => {
      monthView[startDay + index] = day
    })


    //Fills the array with days after month
    for (let i = 0, daysLeft = this._cal_view_days - monthView.length; i < daysLeft; i++) {
      monthView.push(nextMonth.getDays()[i]);
    }


    //Initialize weeks field
    this._weeks.set(Array.from(
      {length: monthView.length / 7},
      (_, i) => monthView.slice(i * 7, i * 7 + 7)
    ));
  }

  /**
   * Changes the current month by the given number of months.
   * @param num
   */
  //TOdo: fox bug where year changes when reaching end of 2025/2024
  changeMonthBy(num: number) {
    const currentDate = this.calModel.CalDate  // Save the current date
    // Change the current date by the given number of months
    this.calModel.CalDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + num, currentDate.getDate())

    // If the year has changed, update the year object in the calendarService
    if (this.calModel.CalDate.getFullYear() !== currentDate.getFullYear()) {
      this.calModel.setYear(this.calModel.CalDate.getFullYear())
    }

    // Update the current month object in the calendarService
    this._month = this.calModel.getYear().getAllMonths()[this.calModel.CalDate.getMonth()]

    // Update the current day object in the calendarService
    this._current_day = this.calModel.getDay();
    this.generateMonthView()  // Regenerate the month view based on the new month object

  }

  setNewDate(year: number, month: number = 0, day: number = 1) {

    this.calModel.CalDate = new Date(year, month-1, day)
    this.calModel.setYear(year)
    this._month = this.calModel.getMonth();
    this._current_day = this.calModel.getDay();
    this.generateMonthView();
  }


  // Returns the current year object
  getYear() {
    return this._year;
  }

  // Returns the current month object
  getMonth(): Month {
    return this._month;
  }

  // Returns the current day object of the month
  getCurrent_day(): Day {
    return this._current_day;
  }

  // Returns a 2d [5|6][7] array representing the week view of the month
  getWeeks() {
    return this._weeks;
  }

  // Returns the weekdays of the month
  getWeekdays(): string[] {
    return this._weekdays;
  }

  // Returns The number of days being displayed in the calendar view
  getCal_view_days(): number {
    return this._cal_view_days;
  }

}
