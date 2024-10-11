import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenPositionComponent } from '../../components/open-position/open-position.component';
import { CurrentPositionComponent } from '../../components/current-position/current-position.component';
import { OpenPosition } from '../../interfaces/open-position.interface';
import { PositionSimulationService } from '../../services/position-simulation.service';
import { OrderBookService } from '../../../order-book/services/order-book.service';
import { ToastrService } from 'ngx-toastr';
import { ListPositionsComponent } from '../../components/list-positions/list-positions.component';
import { SettingsSimulationService } from '../../../settings/services/settings-simulation.service';
import { TradingRequirementsAlertComponent } from '../../components/trading-requirements-alert/trading-requirements-alert.component';

@Component({
  selector: 'app-operate-simulation',
  standalone: true,
  imports: [CommonModule, OpenPositionComponent, CurrentPositionComponent, ListPositionsComponent, TradingRequirementsAlertComponent],
  templateUrl: './operate-simulation.component.html',
  styleUrl: './operate-simulation.component.scss'
})
export class OperateSimulationComponent {
  readonly #settingsSimulationService = inject(SettingsSimulationService);
  readonly #positionSimulationService = inject(PositionSimulationService);
  readonly #orderBookService = inject(OrderBookService);
  readonly #toastrService = inject(ToastrService);

  currentPosition = this.#positionSimulationService.currentPosition;
  exitQuoteAmount = this.#orderBookService.exitQuoteAmount;
  positions = this.#positionSimulationService.lastPositions;
  feePercentage = this.#settingsSimulationService.feePercentage;

  onNewOpenPosition(position: OpenPosition) {
    try {
      if (this.currentPosition()) throw new Error('There is already an open position');
      this.#positionSimulationService.openNewPosition(position.symbol, position.quoteOrderAmount);
      this.#toastrService.success('New position has been open', 'Success');
    } catch (error: any) {
      this.#toastrService.error(error.message, 'Error');
    }
  }

  onClosePosition(id: string) {
    this.#positionSimulationService.closePosition(id);
  }
}
