import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../../../../shared/services/balance.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  readonly #balanceService = inject(BalanceService);

  symbol = input<string>();

  baseBalance = computed(() => {
    if (!this.symbol()) return;
    const baseCurrency = this.symbol()?.split('/')[0];
    return this.#balanceService.balanceByCurrency(baseCurrency!);
  });

  quoteBalance = computed(() => {
    const quoteCurrency = environment.defaultQuoteCurrency;
    return this.#balanceService.balanceByCurrency(quoteCurrency);
  });
}
