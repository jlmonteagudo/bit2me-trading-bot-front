import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TickerService } from '../../shared/services/ticker.service';
import { StrategyService } from '../../shared/services/strategy.service';

@Component({
  selector: 'app-tickers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tickers.component.html',
  styleUrl: './tickers.component.scss',
})
export class TickersComponent {
  readonly #tickerService = inject(TickerService);
  readonly #strategyService = inject(StrategyService);

  strategySettings = this.#strategyService.strategySettings;

  candleInterval = computed(() =>
    this.strategySettings()?.candleInterval?.toString()
  );

  tickers = this.#tickerService.tickers;
}
