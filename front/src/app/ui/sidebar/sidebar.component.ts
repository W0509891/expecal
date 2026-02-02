import {Component, Injectable} from '@angular/core';
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  styleUrl: './sidebar.component.scss',
  template: `
    <div class="sidebar-container">
      <div class="sidebar">
        <div class="sidebar-nav">

          <div class="sidebar-nav-item">
            <a [routerLink]="['']">
              <img src="/assets/svg/event.svg">
            </a>
          </div>

          <div class="sidebar-nav-item">
            <a [routerLink]="['/stats']">
              <img src="/assets/svg/stats.svg" alt="">
            </a>
          </div>

          <div class="sidebar-nav-item">
            <img src="/assets/svg/event.svg">
          </div>

          <div class="sidebar-nav-item">
            <img src="/assets/svg/event.svg">

          </div>

        </div>
      </div>
    </div>
  `
})


export class SidebarComponent {
  constructor() {}
}

@Injectable({providedIn: 'root'})
class SidebarService{
  navbarClosed: boolean = false

  toggle(){
    this.navbarClosed = !this.navbarClosed
    console.log(this.navbarClosed, "Sidebar Closed status")
  }
}

export {SidebarService}
