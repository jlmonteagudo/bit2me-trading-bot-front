import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotStatusComponent } from './components/bot-status/bot-status.component';
import { EntryPointLogsComponent } from './components/entry-point-logs/entry-point-logs.component';
import { BotService } from '../../shared/services/bot.service';
import { BotStatus } from '../../shared/enums/bot-status.enum';
import { CurrentPositionDetailComponent } from './components/current-position-detail/current-position-detail.component';
import { CurrentPositionSummaryComponent } from './components/current-position-summary/current-position-summary.component';
import { PositionService } from '../../shared/services/positions.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BotStatusComponent,
    EntryPointLogsComponent,
    CurrentPositionDetailComponent,
    CurrentPositionSummaryComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly #botService = inject(BotService);
  readonly #positionService = inject(PositionService);

  botStatus = this.#botService.status;
  entryPointLogs = this.#botService.entryPointLogs;
  currentPosition = this.#positionService.currentPosition;

  get BotStatus() {
    return BotStatus;
  }

  onBotStatusChanged(status: BotStatus) {
    this.#botService.setStatus(status);
  }
}
