import { Route } from '@angular/router';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';
import { authGuard } from './shared/guards/auth.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'bot', pathMatch: 'full' },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'bot',
            loadComponent: () =>
              import('./pages/dashboard/dashboard.component').then(
                (m) => m.DashboardComponent
              ),
          },
          {
            path: 'markets',
            loadComponent: () =>
              import('./pages/markets/markets.component').then(
                (m) => m.MarketsComponent
              ),
          },
          {
            path: 'bot-settings',
            loadComponent: () =>
              import('./pages/bot-settings/bot-settings.component').then(
                (m) => m.BotSettingsComponent
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
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
];
