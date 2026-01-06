import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '../../ui/navbar/navbar.component';
import {SidebarComponent, SidebarService} from "../../ui/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  styleUrl: './app.component.scss',
  template: `
    <div class="row1">
      <app-navbar />
    </div>

    <div class="row2">
      <app-sidebar [class]="{'hide':SidebarService.navbarClosed}" />
      <router-outlet />
    </div>
  `
})
export class AppComponent {
  title = 'expecal';

  SidebarService: SidebarService = inject(SidebarService)

}
