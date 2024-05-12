import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryPointLog } from '../../../../shared/interfaces/entry-point-log.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-entry-point-logs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entry-point-logs.component.html',
  styleUrl: './entry-point-logs.component.scss',
})
export class EntryPointLogsComponent {
  entryPointLogs = input<EntryPointLog[]>();
  candleInterval = input<string>();
  allowCreateManualPosition = input<boolean>();
  openPosition = output<string>();
}
