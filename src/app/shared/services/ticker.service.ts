import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map, tap } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Ticker } from '../interfaces/ticker';

export type Candle = number[];

@Injectable({ providedIn: 'root' })
export class TickerService {
  readonly #database = inject(AngularFireDatabase);

  #tickers$: Observable<Ticker[] | null> = this.#database
    .object<any>('tickers')
    .valueChanges()
    .pipe(
      map((tickers) => JSON.parse(tickers) as Ticker[]),
      map((tickers) =>
        tickers.sort((a: Ticker, b: Ticker) => b.percentage - a.percentage)
      )
    );

  tickers = toSignal(this.#tickers$, { initialValue: [] });
}
