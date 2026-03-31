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

          @for (route of navRoutes; track $index) {
            <div class="sidebar-nav-item">
              <a [routerLink]="route.path">
                <svg class="svg">
                  <use [attr.href]="route.icon"></use>
                </svg>
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  `
})


export class SidebarComponent {
  navRoutes = [
    {icon: "/assets/svg/event.svg", path: ""},
    {icon: "/assets/svg/stats.svg", path: '/stats'},
    {icon: "/assets/svg/upload-file.svg", path: '/upload'},
    {icon: "/assets/svg/event.svg", path: ""},
  ]

  constructor() {}
}

@Injectable({providedIn: 'root'})
class SidebarService{
  navbarClosed: boolean = false

  showNav(){
    this.navbarClosed = !this.navbarClosed
    console.log(this.navbarClosed, "Sidebar Closed status")
  }
}

export {SidebarService}
