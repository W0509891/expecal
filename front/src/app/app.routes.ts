import {Route, Routes} from '@angular/router';
import { CalendarComponent} from "./routes/calendar/calendar.component"

const calendar:Route = {path: "", component: CalendarComponent, title: "Calendar" }
export const routes: Routes = [calendar];
