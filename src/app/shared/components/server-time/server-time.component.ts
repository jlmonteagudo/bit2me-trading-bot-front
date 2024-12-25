import { Component, inject } from '@angular/core';
import { ServerTimeService } from '../../services/server-time.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-server-time',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="mt-2">
      Server Time: {{ serverTime() | date: 'dd/MM/yyyy HH:mm:ss' }}
    </div>
  `
})
export class ServerTimeComponent {
  readonly #serverTimeService = inject(ServerTimeService);

  public serverTime = this.#serverTimeService.serverTime;
}
