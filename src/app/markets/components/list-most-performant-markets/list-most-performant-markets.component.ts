import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticker } from '../../interfaces/ticker.interface';
import { Router } from '@angular/router';
import { DeviceTypeService } from '../../../shared/services/device-type.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-list-most-performant-markets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-most-performant-markets.component.html',
  styleUrl: './list-most-performant-markets.component.scss'
})
export class ListMostPerformantMarketsComponent {
  router = inject(Router);
  markets = input.required<Ticker[]>();

  openChart(symbol: string) {
    debugger;

    const urlSymbol = symbol.replace('/', '-');
    const baseUrl = DeviceTypeService.getDeviceType() === 'desktop' ? environment.urls.bit2me : environment.urls.bit2meMobile;
    window.open(`${baseUrl}/${urlSymbol}`, '_blank');
  }

  openOperate(symbol: string) {
    this.router.navigate(['/operate-simulation'], { queryParams: { symbol } });
  }
}
