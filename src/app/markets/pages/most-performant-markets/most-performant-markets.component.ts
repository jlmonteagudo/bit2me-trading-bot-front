import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketService } from '../../services/market.service';
import { ListMostPerformantMarketsComponent } from '../../components/list-most-performant-markets/list-most-performant-markets.component';

@Component({
  selector: 'app-most-performant-markets',
  standalone: true,
  imports: [CommonModule, ListMostPerformantMarketsComponent],
  templateUrl: './most-performant-markets.component.html',
  styleUrl: './most-performant-markets.component.scss'
})
export class MostPerformantMarketsComponent {
  readonly #marketService = inject(MarketService);

  markets = this.#marketService.performantMarkets;
}
