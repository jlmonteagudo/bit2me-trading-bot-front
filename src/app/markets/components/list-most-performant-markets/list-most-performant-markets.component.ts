import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticker } from '../../interfaces/ticker.interface';
import { Router } from '@angular/router';

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
    const urlSymbol = symbol.replace('/', '-');
    window.open(`https://pro.bit2me.com/exchange/${urlSymbol}`, '_blank');
  }

  openOperate(symbol: string) {
    this.router.navigate(['/operate-simulation'], { queryParams: { symbol } });
  }
}
