import { Component } from '@angular/core';
import { MatTabsModule, matTabsAnimations} from '@angular/material/tabs'
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { ThemePalette } from '@angular/material/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatTabsModule,
    DashboardComponent,
    LoginComponent,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    RouterOutlet,
    MatButtonModule,

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
background: ThemePalette;


tabs = [
  { label: 'Tab 1', link: '/tab1' },
  { label: 'Tab 2', link: '/tab2' }
];


}
