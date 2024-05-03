import { Component, inject, input, output } from '@angular/core';
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
  botStatusChanged = output<BotStatus>();

  get BotStatus() {
    return BotStatus;
  }
}
