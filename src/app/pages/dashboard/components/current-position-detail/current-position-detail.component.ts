import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Position } from '../../../../shared/interfaces/position.interface';
import { CurrencyBySymbolPipe } from '../../../../shared/pipes/currency-by-symbol.pipe';

@Component({
  selector: 'app-current-position-detail',
  standalone: true,
  imports: [CommonModule, CurrencyBySymbolPipe],
  templateUrl: './current-position-detail.component.html',
  styleUrl: './current-position-detail.component.scss',
})
export class CurrentPositionDetailComponent {
  currentPosition = input<Position>();
  closeCurrentPosition = output<boolean>();
  isClosingCurrentPosition = false;

  closePosition() {
    this.closeCurrentPosition.emit(true);
    this.isClosingCurrentPosition = true;
  }
}
