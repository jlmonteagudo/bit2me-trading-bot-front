import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Candle } from '../interfaces/candle';

export type ResponseCandle = number[];

@Injectable({ providedIn: 'root' })
export class CandleService {
  readonly #http = inject(HttpClient);
  readonly #apiDomain = environment.apiDomain('candles');

  getCandles(
    symbol: string,
    interval: string,
    numberOfCandles: number
  ): Observable<Candle[]> {
    const url = `${
      this.#apiDomain
    }/?symbol=${symbol}&interval=${interval}&numberOfCandles=${numberOfCandles}`;

    return this.#http.get<ResponseCandle[]>(url).pipe(
      map((candles) =>
        candles.map((responseCandle) => {
          const candle: Candle = {
            symbol: symbol,
            interval: interval,
            timestamp: responseCandle[0],
            open: responseCandle[1],
            high: responseCandle[2],
            low: responseCandle[3],
            close: responseCandle[4],
            percentage: (responseCandle[4] / responseCandle[1]) * 100 - 100,
          };

          return candle;
        })
      )
    );
  }
}
