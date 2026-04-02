import {Component, inject, Injectable} from '@angular/core';
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  styleUrl: './sidebar.component.scss',
  template: `
    <div class="sidebar-container">
      <div class="sidebar-nav">

        @for (route of navRoutes; track $index) {
          <div class="sidebar-nav-item">
            <a [routerLink]="route.path">
              <svg [class]='["svg", isCurrentRoute(route.path)]'>
                <use [attr.href]="route.icon"></use>
              </svg>
            </a>
          </div>
        }
      </div>
    </div>
  `
})


export class SidebarComponent {
  router: Router = inject(Router)
  navRoutes = [
    {icon: "/assets/svg/event.svg", path: "/"},
    {icon: "/assets/svg/stats.svg", path: '/stats'},
    {icon: "/assets/svg/upload-file.svg", path: '/uploads'},
    {icon: "/assets/svg/event.svg", path: "/transactions"},
  ]

  constructor() {
    console.log({
      state: this.router.routerState,
      current: this.router.url,
    })
  }

  isCurrentRoute(routePath: string): string {
    if (this.router.url === routePath){
      return "active"
    }
    return ""
  }
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
