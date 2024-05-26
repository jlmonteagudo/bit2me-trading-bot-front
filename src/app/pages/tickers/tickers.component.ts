import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TickerService } from '../../shared/services/ticker.service';
import { StrategyService } from '../../shared/services/strategy.service';
@Component({
  selector: 'app-tickers',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './tickers.component.html',
  styleUrl: './tickers.component.scss',
})
export class TickersComponent {
  readonly #tickerService = inject(TickerService);
  readonly #strategyService = inject(StrategyService);

  candleInterval = this.#strategyService.candleInterval;

  tickers = this.#tickerService.tickers;

  searchTerm = signal('');
  filterGroup = signal('USDT');

  filteredTickers = computed(() => {
    const searchTerm = this.searchTerm().toUpperCase();
    let tickers = [...(this.tickers() || [])];

    if (this.filterGroup() === 'USDT')
      tickers = tickers.filter((ticker) => ticker.symbol.endsWith('/USDT'));

    if (this.searchTerm().length)
      tickers = tickers.filter((ticker) => ticker.symbol.includes(searchTerm));

    return tickers;
  });
}
