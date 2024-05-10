import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type Candle = number[];

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

    return this.#http.get<Candle[]>(url);
  }
}
