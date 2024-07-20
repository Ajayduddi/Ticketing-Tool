import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Sidebar, SidebarModule} from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { EmployeeModel } from '../../core/models/api.model';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SidebarModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    RippleModule,
    ButtonModule,
    OverlayPanelModule,
    MenuModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  primengConfig = inject(PrimeNGConfig);
  logoutVisible: boolean = false;
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined;

  data = localStorage.getItem('user') || '';
  name: string = '';

  router = inject(Router);

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }
  logout() {
    localStorage.removeItem('data');
    this.router.navigate(['/login']);
  }
}
