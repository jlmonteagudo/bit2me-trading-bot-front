import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Position } from '../../interfaces/position.interface';
import { SymbolCurrencyPipe } from '../../../shared/pipes/symbol-currency.pipe';
import { environment } from '../../../../environments/environment';
import { DeviceTypeService } from '../../../shared/services/device-type.service';

@Component({
  selector: 'app-current-position',
  standalone: true,
  imports: [CommonModule, SymbolCurrencyPipe],
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

  profitPercentage = computed(() => {
    if (!this.currentPosition()) return 0;
    return (this.profit() / this.currentPosition()!.entryQuoteAmount) * 100;
  });

  stopLossDistance = computed(() => {
    if (!this.currentPosition()) return 0;
    return this.exitQuoteAmount() - this.currentPosition()!.stopLossCost;
  });

  nextTrailingDistance = computed(() => {
    if (!this.currentPosition()) return 0;
    return this.currentPosition()!.takeProfitCost - this.exitQuoteAmount();
  });

  openChart(symbol: string) {
    const urlSymbol = symbol.replace('/', '-');
    const baseUrl = DeviceTypeService.getDeviceType() === 'desktop' ? environment.urls.bit2me : environment.urls.bit2meMobile;
    window.open(`${baseUrl}/${urlSymbol}`, '_blank');
  }
}
