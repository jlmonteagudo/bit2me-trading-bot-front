import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-positions-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './positions-list.component.html',
  styleUrl: './positions-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionsListComponent {
  readonly #positionService = inject(PositionService);

  positions = this.#positionService.lastPositions;

  normalizedQuoteAmount = signal(0);
  quoteAmount = 0;

  postionsWithNormalizedAmount = computed(() => {
    const normalizedQuoteAmount = this.normalizedQuoteAmount();

    return this.positions()?.map(position => {
      const newPosition = { ...position };
      const ratio = (normalizedQuoteAmount || position.entryCost) / position.entryCost;

      newPosition.baseAmount *= ratio;
      newPosition.entryPrice *= ratio;
      newPosition.exitPrice *= ratio;
      newPosition.entryCost *= ratio;
      newPosition.exitCost *= ratio;
      newPosition.profit *= ratio;

      return newPosition;
    });
  });

  normalizeQuote() {
    this.normalizedQuoteAmount.set(+this.quoteAmount);
  }
}
