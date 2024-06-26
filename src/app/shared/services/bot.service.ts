import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { BotStatus } from '../enums/bot-status.enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { EntryPointLog } from '../interfaces/entry-point-log.interface';
import { BotSettings } from '../interfaces/bot-settings.interface';

@Injectable({ providedIn: 'root' })
export class BotService {
  readonly #database = inject(AngularFireDatabase);

  #status$: Observable<BotStatus | null> = this.#database
    .object<BotStatus>('bot/status')
    .valueChanges();

  status = toSignal(this.#status$);

  #manualMode$: Observable<boolean | null> = this.#database
    .object<boolean>('bot/manualMode')
    .valueChanges();

  manualMode = toSignal(this.#manualMode$);

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

  botSettings$: Observable<BotSettings | null> = this.#database
    .object<BotSettings>('bot')
    .valueChanges();

  botSettings = toSignal(this.botSettings$);

  setStatus(status: BotStatus): Promise<void> {
    return this.#database.object('bot/status').set(status);
  }

  setManulaMode(manualMode: boolean): Promise<void> {
    return this.#database.object('bot/manualMode').set(manualMode);
  }

  saveSettings(settings: Partial<BotSettings>): Promise<void> {
    return this.#database.object('bot').update(settings);
  }
}
