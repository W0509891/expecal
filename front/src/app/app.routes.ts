import {Route, Routes} from '@angular/router';
import { CalendarComponent} from "./ui/calendar/calendar.component"
import {StatsComponent} from './routes/stats/stats.component';
import {Component} from '@angular/core';

const calendar:Route = {path: "", component: CalendarComponent, title: "Calendar" }
const stats:Route = {path: "stats", component: StatsComponent, title: "Statistics" }
const transactions:Route = {path: "transactions", component: Component, title: "Transactions" }
const uploads:Route = {path: "uploads", component: Component, title: "uploads" }

export const routes: Routes = [calendar, stats, transactions, uploads];
