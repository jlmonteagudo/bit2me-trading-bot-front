import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [DatePipe],
  template: `
    @if(logMessage()) {
      <div class="mt-2">
        {{ logMessage() }}
      </div>
    }
  `
})
export class LogComponent {
  readonly #logService = inject(LogService);

  public logMessage = this.#logService.logMessage;
}
