import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../../services/balance.service';
import { Balance } from '../../interfaces/balance';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  readonly #balanceService = inject(BalanceService);

  balances = computed(() => {
    const balances = this.#balanceService.balances() || [];
    return balances.sort((a: Balance, b: Balance) => a.currency.localeCompare(b.currency));
  });
}
