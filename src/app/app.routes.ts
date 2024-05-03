import { Route } from '@angular/router';
import { ContentLayoutComponent } from './shared/layouts/content-layout/content-layout.component';
import { content } from './shared/routes/content.routes';
import { authGuard } from './shared/guards/auth.guard';

export const App_Route: Route[] = [
  { path: '', redirectTo: 'bot', pathMatch: 'full' },
  {
    path: '',
    component: ContentLayoutComponent,
    children: content,
    canActivate: [authGuard],
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('../app/authentication/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
];
