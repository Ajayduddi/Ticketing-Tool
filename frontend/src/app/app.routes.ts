import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guard/auth.guard';
import { EmployeeComponent } from './pages/employee/employee.component';
import { DepartmentComponent } from './pages/department/department.component';
import { ParentCategoryComponent } from './pages/parent-category/parent-category.component';
import { ChildCategoryComponent } from './pages/child-category/child-category.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'department',
        component: DepartmentComponent,
      },
      {
        path: 'parent-category',
        component: ParentCategoryComponent
      },
      {
        path: 'child-category',
        component: ChildCategoryComponent
      },
      {
        path: 'tickets',
        component:TicketListComponent
      },
      {
        path: 'new-ticket',
        component: NewTicketComponent
      }
    ],
  },
];
