import { Route } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { authGuard } from './auth/guards/auth.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'operate-simulation', pathMatch: 'full' },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'operate-simulation',
            loadComponent: () =>
              import('./positions/pages/operate-simulation/operate-simulation.component').then(
                (m) => m.OperateSimulationComponent
              ),
          },
        ],
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
];
