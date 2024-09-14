import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Position } from '../../interfaces/position.interface';
import { OrderBookService } from '../../../order-book/services/order-book.service';

@Component({
  selector: 'app-current-position',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-position.component.html',
  styleUrl: './current-position.component.scss'
})
export class CurrentPositionComponent {
  readonly #orderBookService = inject(OrderBookService);

  currentPosition = input.required<Position>();
  orderBook = input.required();
  feePercentage = input.required<number>();
  closePosition = output<string>();

  sellQuote = computed(() => {
    if (!this.currentPosition() || !this.orderBook()) return 0;

    const feePercentage = this.feePercentage();
    const sellQuote = this.#orderBookService.getSellQuote(this.currentPosition()!.baseAmount);
    const feeAmount = sellQuote * feePercentage / 100;

    return sellQuote - feeAmount;
  });

  profit = computed(() => {
    if (!this.currentPosition()) return 0;
    return this.sellQuote() - this.currentPosition()!.entryQuoteAmount;
  });
}
