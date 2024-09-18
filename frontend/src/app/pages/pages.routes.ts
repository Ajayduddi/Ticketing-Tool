import { Routes } from '@angular/router';
import { authGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    // apply lazy loading to my project using loadComponent
    path: '',
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'employee',
        loadComponent: () => import('./employee/employee.component').then((m) => m.EmployeeComponent),
      },
      {
        path: 'department',
        loadComponent: () => import('./department/department.component').then((m) => m.DepartmentComponent),
      },
      {
        path: 'parent-category',
        loadComponent: () => import('./parent-category/parent-category.component').then((m) => m.ParentCategoryComponent),
      },
      {
        path: 'child-category',
        loadComponent: () => import('./child-category/child-category.component').then((m) => m.ChildCategoryComponent),
      },
      {
        path: 'tickets',
        loadComponent: () => import('./ticket-list/ticket-list.component').then((m) => m.TicketListComponent),
      },
      {
        path: 'ticket-view',
        loadComponent: () => import('./ticket-list/ticket-view/ticket-view.component').then((m) => m.TicketViewComponent),
      },
      {
        path: 'new-ticket',
        loadComponent: () => import('./new-ticket/new-ticket.component').then((m) => m.NewTicketComponent),
      },
    ],
  },
];


export default routes;
