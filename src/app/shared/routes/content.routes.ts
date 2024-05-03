import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  admin,
  dashboardRoutingModule,
} from '../../components/dashboards/dashboard.routes';
import { pagesRoutingModule } from '../../components/pages/pages.routes';
import { filemanagerRoutingModule } from '../../components/pages/file-manager/filemanager.routes';

export const content: Routes = [
  {
    path: '',
    children: [
      // ...dashboardRoutingModule.routes,
      // ...pagesRoutingModule.routes,
      // ...filemanagerRoutingModule.routes,
      {
        path: 'bot',
        loadComponent: () =>
          import('../../pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'markets',
        loadComponent: () =>
          import('../../pages/markets/markets.component').then(
            (m) => m.MarketsComponent
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(admin)],
  exports: [RouterModule],
})
export class SaredRoutingModule {}
