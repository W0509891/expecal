import { Component, Input } from '@angular/core';
import {Day} from '../../models/CalendarModel';

@Component({
  selector: 'fiscal-day',
  imports: [],
  styleUrl: './fiscal-day.component.scss',
  template: `
    <!--Date in to left-->
    <div class="dayNumber">{{ day.getId() }}</div>


    <!--Total gain in center-->
    <div>
      <div>

      </div>
    </div>

    <!--Spend vs received at bottom-->
    <div>
      <div>
        <span></span>
        <span></span>
      </div>
      <div>
        <span></span>
        <span></span>
      </div>
    </div>
  `
})
export class FiscalDayComponent {
  // static day: number = 1
  @Input() day!: Day
  constructor() {
    // FiscalDayComponent.day++
  }
}
