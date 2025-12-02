import { Routes } from '@angular/router';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';
import { MainLayout } from './layout/main-layout/main-layout';
import { Login } from './pages/login/login';
import { MisReservas } from './pages/mis-reservas/mis-reservas';
import { AdminRestaurante } from './pages/admin-restaurante/admin-restaurante';

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
      { path: 'mis-reservas',
         component: MisReservas },
      {path: 'admin-restaurante',
        component: AdminRestaurante
      },

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
