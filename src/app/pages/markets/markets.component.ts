import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarketService } from '../../shared/services/market.service';

@Component({
  selector: 'app-markets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './markets.component.html',
  styleUrl: './markets.component.scss',
})
export class MarketsComponent {
  readonly #marketService = inject(MarketService);
  markets = this.#marketService.markets;
  marketCode: string = '';

  addMarket() {
    if (!this.marketCode) return;
    this.#marketService.addMarket(this.marketCode);
    this.marketCode = '';
  }

  deleteMarket(code: string) {
    this.#marketService.deleteMarket(code);
  }
}
