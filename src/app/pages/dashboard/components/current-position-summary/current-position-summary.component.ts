import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Position } from '../../../../shared/interfaces/position.interface';
import { CurrencyBySymbolPipe } from '../../../../shared/pipes/currency-by-symbol.pipe';

@Component({
  selector: 'app-current-position-summary',
  standalone: true,
  imports: [CommonModule, CurrencyBySymbolPipe],
  templateUrl: './current-position-summary.component.html',
  styleUrl: './current-position-summary.component.scss',
})
export class CurrentPositionSummaryComponent {
  currentPosition = input<Position>();

  estimatedExitCost = computed(() => {
    const position = this.currentPosition();
    if (!position) return 0;
    return position.positionBaseAmount * position.exitPrice;
  });

  estimatedProfit = computed(() => {
    const position = this.currentPosition();
    if (!position) return 0;
    return this.estimatedExitCost() - position.entryQuoteAmount;
  });

  estimatedProfitPercentage = computed(() => {
    const position = this.currentPosition();
    if (!position) return 0;
    return (this.estimatedExitCost() / position.entryQuoteAmount) * 100 - 100;
  });
}
