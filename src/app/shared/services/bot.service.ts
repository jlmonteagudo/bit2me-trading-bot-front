import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { BotStatus } from '../enums/bot-status.enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { EntryPointLog } from '../interfaces/entry-point-log.interface';

@Injectable({ providedIn: 'root' })
export class BotService {
  readonly #database = inject(AngularFireDatabase);

  #status$: Observable<BotStatus | null> = this.#database
    .object<BotStatus>('bot/status')
    .valueChanges();

  status = toSignal(this.#status$);

  #entryPointLogs$: Observable<EntryPointLog[]> = this.#database
    .object<string>('logs/entry-point')
    .valueChanges()
    .pipe(
      map((entryPointLogs: string | null) => {
        if (!entryPointLogs) return [];
        return JSON.parse(entryPointLogs!).sort(
          (a: EntryPointLog, b: EntryPointLog) => {
            if (a.areAllCandlesPositive === b.areAllCandlesPositive) {
              return (
                b.intervalPercentagePriceVariation -
                a.intervalPercentagePriceVariation
              );
            } else {
              return a.areAllCandlesPositive ? -1 : 1;
            }
          }
        );
      })
    );

  entryPointLogs = toSignal(this.#entryPointLogs$);

  setStatus(status: BotStatus): Promise<void> {
    return this.#database.object('bot/status').set(status);
  }
}
