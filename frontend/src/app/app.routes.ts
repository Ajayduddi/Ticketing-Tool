import { Routes } from '@angular/router';
import { IntroComponent } from './pages/intro/intro.component';

export const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
  },
  {
    // apply lazy loading to my project using loadComponent
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    // apply lazy loading to my project using loadChildren
    path: 'pages',
    loadChildren: () => import('./pages/pages.routes'),
  },
];
