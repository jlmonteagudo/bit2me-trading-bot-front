import { Injectable, computed, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { StrategySettings } from '../interfaces/strategy-settings.interface';

@Injectable({ providedIn: 'root' })
export class StrategyService {
  readonly #database = inject(AngularFireDatabase);

  strategySettings$: Observable<StrategySettings | null> = this.#database
    .object<StrategySettings>('strategies/candle-performance')
    .valueChanges();

  strategySettings = toSignal(this.strategySettings$);

  candleInterval = computed(() =>
    this.strategySettings()?.candleInterval?.toString()
  );

  saveSettings(settings: Partial<StrategySettings>): Promise<void> {
    return this.#database
      .object('strategies/candle-performance')
      .update(settings);
  }
}
