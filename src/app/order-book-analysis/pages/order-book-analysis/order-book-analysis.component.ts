import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionService } from '../../services/position.service';
import { OrderBookService } from '../../services/order-book.service';

@Component({
  selector: 'app-order-book-analysis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-book-analysis.component.html',
  styleUrl: './order-book-analysis.component.scss'
})
export class OrderBookAnalysisComponent {
  readonly #positionsService = inject(PositionService);
  readonly #orderBookService = inject(OrderBookService);

  currentPosition = this.#positionsService.currentPosition;
  orderBook = this.#orderBookService.orderBook;

  sellQuote = computed(() => {
    if (!this.currentPosition() || !this.orderBook()) return 0;
    return this.#orderBookService.getSellQuote(this.currentPosition()!.baseAmount);
  });

  profit = computed(() => {
    if (!this.currentPosition()) return 0;
    return this.sellQuote() - this.currentPosition()!.entryQuoteAmount;
  });
}
