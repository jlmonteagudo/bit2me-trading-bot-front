import { Component, computed, effect, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Position } from '../../interfaces/position.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-positions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-positions.component.html',
  styleUrl: './list-positions.component.scss'
})
export class ListPositionsComponent {
  positions = input<Position[]>();
  normalizedQuoteAmount = signal(0);
  quoteAmount = 0;

  postionsWithNormalizedAmount = computed(() => {
    const normalizedQuoteAmount = this.normalizedQuoteAmount();

    return this.positions()?.map(position => {
      const newPosition = { ...position };
      const ratio = (normalizedQuoteAmount || position.entryQuoteAmount) / position.entryQuoteAmount;

      newPosition.baseAmount *= ratio;
      newPosition.entryAveragePrice *= ratio;
      newPosition.exitAveragePrice *= ratio;
      newPosition.entryQuoteAmount *= ratio;
      newPosition.exitQuoteAmount *= ratio;
      newPosition.profit *= ratio;

      return newPosition;
    });
  });

  normalizeQuote() {
    this.normalizedQuoteAmount.set(+this.quoteAmount);
  }
}
