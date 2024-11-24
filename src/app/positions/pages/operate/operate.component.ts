import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenPositionComponent } from '../../components/open-position/open-position.component';
import { CurrentPositionComponent } from '../../components/current-position/current-position.component';
import { OpenPosition } from '../../interfaces/open-position.interface';
import { PositionService } from '../../services/position.service';
import { OrderBookService } from '../../../order-book/services/order-book.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ListPositionsComponent } from '../../components/list-positions/list-positions.component';
import { SettingsService } from '../../../settings/services/settings.service';
import { TradingRequirementsAlertComponent } from '../../components/trading-requirements-alert/trading-requirements-alert.component';

@Component({
  selector: 'app-operate',
  standalone: true,
  imports: [CommonModule, OpenPositionComponent, CurrentPositionComponent, ListPositionsComponent, TradingRequirementsAlertComponent],
  templateUrl: './operate.component.html',
  styleUrl: './operate.component.scss'
})
export class OperateComponent {
  readonly #settingsService = inject(SettingsService);
  readonly #positionService = inject(PositionService);
  readonly #orderBookService = inject(OrderBookService);
  readonly #toastrService = inject(ToastrService);
  readonly #route = inject(ActivatedRoute);


  currentPosition = this.#positionService.currentPosition;
  exitCost = this.#orderBookService.exitCost;
  positions = this.#positionService.lastPositions;
  feePercentage = this.#settingsService.feePercentage;
  symbol = this.#route.snapshot.queryParams['symbol'];

  onNewOpenPosition(position: OpenPosition) {
    try {
      if (this.currentPosition()) throw new Error('There is already an open position');
      this.#positionService.openNewPosition(position.symbol, position.quoteOrderAmount);
      this.#toastrService.success('New position has been open', 'Success');
    } catch (error: any) {
      this.#toastrService.error(error.message, 'Error');
    }
  }

  onClosePosition(id: string) {
    this.#positionService.closePosition(id);
  }
}
