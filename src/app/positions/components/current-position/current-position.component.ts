import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Position } from '../../interfaces/position.interface';
import { SymbolCurrencyPipe } from '../../../shared/pipes/symbol-currency.pipe';

@Component({
  selector: 'app-current-position',
  standalone: true,
  imports: [CommonModule, SymbolCurrencyPipe],
  templateUrl: './current-position.component.html',
  styleUrl: './current-position.component.scss'
})
export class CurrentPositionComponent {
  router = inject(Router);

  currentPosition = input.required<Position>();
  exitCost = input.required<number>();
  closePosition = output<string>();

  profit = computed(() => {
    if (!this.currentPosition()) return 0;
    return this.exitCost() - this.currentPosition()!.entryCost;
  });

  profitPercentage = computed(() => {
    if (!this.currentPosition()) return 0;
    return (this.profit() / this.currentPosition()!.entryCost) * 100;
  });

  stopLossDistance = computed(() => {
    if (!this.currentPosition()) return 0;
    return this.exitCost() - this.currentPosition()!.stopLossCost;
  });

  nextTrailingDistance = computed(() => {
    if (!this.currentPosition()) return 0;
    return this.currentPosition()!.takeProfitCost - this.exitCost();
  });
}
