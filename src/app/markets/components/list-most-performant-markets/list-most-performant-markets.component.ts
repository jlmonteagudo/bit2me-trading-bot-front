import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MarketScore } from '../../interfaces/market-score.interface';

@Component({
  selector: 'app-list-most-performant-markets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-most-performant-markets.component.html',
  styleUrl: './list-most-performant-markets.component.scss'
})
export class ListMostPerformantMarketsComponent {
  router = inject(Router);
  markets = input.required<MarketScore[]>();

  openOperate(symbol: string) {
    this.router.navigate(['/operate'], { queryParams: { symbol } });
  }

  // openChart(symbol: string) {
  //   this.router.navigate(['/chart'], { queryParams: { symbol } });
  // }
}
