import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../../shared/services/balance.service';
import { Balance } from '../../shared/interfaces/balance';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  readonly #balanceService = inject(BalanceService);

  balances = (this.#balanceService.balances() || []).sort(
    (a: Balance, b: Balance) => a.currency.localeCompare(b.currency)
  );
}
