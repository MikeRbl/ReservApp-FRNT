import { Routes } from '@angular/router';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';
import { MainLayout } from './layout/main-layout/main-layout';
import { Login } from './pages/login/login';
import { MisReservas } from './pages/mis-reservas/mis-reservas';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  
  {
    path: 'dashboard',
    component: MainLayout,
    children: [
      { 
        path: '', 
        component: DashboardHome 
      },
      { path: 'reservas',
         component: MisReservas },

    ]
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
