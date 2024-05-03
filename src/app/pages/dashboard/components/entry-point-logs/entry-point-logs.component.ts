import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryPointLog } from '../../../../shared/interfaces/entry-point-log.interface';

@Component({
  selector: 'app-entry-point-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entry-point-logs.component.html',
  styleUrl: './entry-point-logs.component.scss',
})
export class EntryPointLogsComponent {
  entryPointLogs = input<EntryPointLog[]>();
}
