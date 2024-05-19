import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Position } from '../../../../shared/interfaces/position.interface';
import { CurrencyBySymbolPipe } from '../../../../shared/pipes/currency-by-symbol.pipe';
import { Ticker } from '../../../../shared/interfaces/ticker';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-current-position-detail',
  standalone: true,
  imports: [CommonModule, CurrencyBySymbolPipe, RouterLink],
  templateUrl: './current-position-detail.component.html',
  styleUrl: './current-position-detail.component.scss',
})
export class CurrentPositionDetailComponent {
  currentPosition = input<Position>();
  currentTicker = input<Ticker>();
  candleInterval = input<string>();
  closeCurrentPosition = output<boolean>();
  isClosingCurrentPosition = false;

  closePosition() {
    this.closeCurrentPosition.emit(true);
    this.isClosingCurrentPosition = true;
  }
}
