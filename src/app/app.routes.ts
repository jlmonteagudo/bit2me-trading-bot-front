import { Route } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { authGuard } from './auth/guards/auth.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'performant-markets', pathMatch: 'full' },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'operate',
            loadComponent: () =>
              import('./positions/pages/operate/operate.component').then(
                (m) => m.OperateComponent
              ),
          },
          {
            path: 'positions-list',
            loadComponent: () =>
              import('./positions/pages/positions-list/positions-list.component').then(
                (m) => m.PositionsListComponent
              ),
          },
          {
            path: 'performant-markets',
            loadComponent: () =>
              import('./markets/pages/most-performant-markets/most-performant-markets.component').then(
                (m) => m.MostPerformantMarketsComponent
              ),
          },
          {
            path: 'balance',
            loadComponent: () =>
              import('./balance/pages/balance/balance.component').then(
                (m) => m.BalanceComponent
              ),
          },
          {
            path: 'settings',
            loadComponent: () =>
              import('./settings/pages/settings/settings.component').then(
                (m) => m.SettingsComponent
              ),
          },
          {
            path: 'profit-simulation',
            loadComponent: () =>
              import('./profit-simulation/pages/profit-simulation/profit-simulation.component').then(
                (m) => m.ProfitSimulationComponent
              ),
          },
          {
            path: 'display-chart',
            loadComponent: () =>
              import('./chart/pages/display-chart/display-chart.component').then(
                (m) => m.DisplayChartComponent
              ),
          }
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
