import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotStatus } from '../../../../shared/enums/bot-status.enum';

@Component({
  selector: 'app-bot-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bot-status.component.html',
  styleUrl: './bot-status.component.scss',
})
export class BotStatusComponent {
  botStatus = input.required<BotStatus>();
  manualMode = input.required<boolean>();

  botStatusChanged = output<BotStatus>();
  manualModeChanged = output<boolean>();

  toggleBotStatus() {
    const newBotStatus =
      this.botStatus() === BotStatus.On ? BotStatus.Off : BotStatus.On;
    this.botStatusChanged.emit(newBotStatus);
  }

  toggleManualMode() {
    this.manualModeChanged.emit(!this.manualMode());
  }
}
