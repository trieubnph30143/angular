import { Component, NgModule } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}
