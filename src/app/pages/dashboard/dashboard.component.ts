import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotStatusComponent } from './components/bot-status/bot-status.component';
import { EntryPointLogsComponent } from './components/entry-point-logs/entry-point-logs.component';
import { BotService } from '../../shared/services/bot.service';
import { BotStatus } from '../../shared/enums/bot-status.enum';
import { CurrentPositionDetailComponent } from './components/current-position-detail/current-position-detail.component';
import { CurrentPositionSummaryComponent } from './components/current-position-summary/current-position-summary.component';
import { PositionService } from '../../shared/services/positions.service';
import { StrategyService } from '../../shared/services/strategy.service';
import { LastPositionsComponent } from './components/last-positions/last-positions.component';
import { BalanceComponent } from './components/balance/balance.component';
import { TickerService } from '../../shared/services/ticker.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BotStatusComponent,
    EntryPointLogsComponent,
    CurrentPositionDetailComponent,
    CurrentPositionSummaryComponent,
    LastPositionsComponent,
    BalanceComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly #botService = inject(BotService);
  readonly #positionService = inject(PositionService);
  readonly #strategyService = inject(StrategyService);
  readonly #tickerService = inject(TickerService);

  botStatus = this.#botService.status;
  manualMode = this.#botService.manualMode;
  entryPointLogs = this.#botService.entryPointLogs;
  currentPosition = this.#positionService.currentPosition;
  strategySettings = this.#strategyService.strategySettings;
  lastPositions = this.#positionService.lastPositions;

  candleInterval = this.#strategyService.candleInterval;

  currentTicker = computed(() => {
    return this.currentPosition()
      ? this.#tickerService.getTicker(this.currentPosition()?.symbol!)
      : undefined;
  });

  allowCreateManualPosition = computed(
    () => !this.currentPosition() && !!this.manualMode()
  );

  get BotStatus() {
    return BotStatus;
  }

  onBotStatusChanged(status: BotStatus) {
    this.#botService.setStatus(status);
  }

  onManualModeChanged(manulaMode: boolean) {
    this.#botService.setManulaMode(manulaMode);
  }

  onOpenPosition(symbol: string) {
    this.#positionService.openNewPosition(symbol);
  }

  onCloseCurrentPosition() {
    this.#positionService.closeCurrentPosition();
  }
}
