import { Component, effect, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OpenPosition } from '../../interfaces/open-position.interface';
import { BalanceService } from '../../../balance/services/balance.service';

@Component({
  selector: 'app-open-position',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './open-position.component.html',
  styleUrl: './open-position.component.scss'
})
export class OpenPositionComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #toastrService = inject(ToastrService);
  readonly #balanceService = inject(BalanceService);

  newOpenPosition = output<OpenPosition>();

  symbol = input();

  #symbolEffect = effect(() => {
    const symbol = this.symbol() as string;
    this.positionForm.patchValue({ symbol });
  });

  positionForm = this.#formBuilder.group({
    symbol: ['', [Validators.required]],
    quoteOrderAmount: [0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(10)]],
  });

  maxQuote() {
    const symbol = this.positionForm.get('symbol')?.value;

    if (!symbol) return;

    const quote = symbol.split('/')[1];
    const balanceQuote = this.getCurrencyBalance(quote);

    this.positionForm.patchValue({ quoteOrderAmount: Math.trunc(balanceQuote) });
  }

  async savePosition() {
    try {
      this.validateForm();
      const openPosition = this.positionForm.value as OpenPosition;
      this.newOpenPosition.emit(openPosition);
    } catch (error: any) {
      this.#toastrService.error(error.message, 'Error');
    }
  }

  validateForm() {
    if (!this.positionForm.valid) throw new Error('The data is invalid');

    const symbol = this.positionForm.get('symbol')?.value;
    const quoteOrderAmount = +(this.positionForm.get('quoteOrderAmount')?.value || 0);

    if (!symbol) return;

    const quote = symbol.split('/')[1];
    const balanceQuote = this.getCurrencyBalance(quote);

    if (quoteOrderAmount > balanceQuote) throw new Error('Insufficient balance');
  }

  getCurrencyBalance(currency: string): number {
    return this.#balanceService.balanceByCurrency(currency)?.balance || 0;
  }
}
