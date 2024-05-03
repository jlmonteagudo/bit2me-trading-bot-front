import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Market } from '../interfaces/market';

@Injectable({ providedIn: 'root' })
export class MarketService {
  readonly #database = inject(AngularFireDatabase);

  #markets$: Observable<Market[] | null> = this.#database
    .object<any>('strategies/candle-performance/symbols')
    .valueChanges()
    .pipe(
      map((marketsObject) =>
        Object.keys(marketsObject).map((code) => ({
          code: code.replace('-', '/'),
          enabled: marketsObject[code],
        }))
      )
    );

  markets = toSignal(this.#markets$, { initialValue: [] });

  addMarket(code: string): Promise<void> {
    const market: Market = { code, enabled: true };
    return this.#database
      .object(
        `strategies/candle-performance/symbols/${market.code.replace('/', '-')}`
      )
      .set(market.enabled);
  }

  deleteMarket(code: string): Promise<void> {
    return this.#database
      .object(`strategies/candle-performance/symbols/${code.replace('/', '-')}`)
      .remove();
  }
}
