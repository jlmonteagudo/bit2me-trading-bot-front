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
  currentPosition = input.required<Position>();
  exitQuoteAmount = input.required<number>();
  feePercentage = input.required<number>();
  closePosition = output<string>();

  profit = computed(() => {
    if (!this.currentPosition()) return 0;
    return this.exitQuoteAmount() - this.currentPosition()!.entryQuoteAmount;
  });

  stopLossDistance = computed(() => {
    if (!this.currentPosition()) return 0;
    return this.exitQuoteAmount() - this.currentPosition()!.stopLossCost;
  });

  nextTrailingDistance = computed(() => {
    if (!this.currentPosition()) return 0;
    return this.currentPosition()!.takeProfitCost - this.exitQuoteAmount();
  });
}
