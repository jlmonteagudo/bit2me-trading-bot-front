import { computed, inject, Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Ticker } from '../interfaces/ticker.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class MarketService {
  readonly #database = inject(AngularFireDatabase);
  readonly #performantMarketsURL = '/manual-trading/simulation/performant-markets';

  #performantMarkets$: Observable<Ticker[] | null> = this.#database.object<Ticker[]>(this.#performantMarketsURL).valueChanges();

  #performantMarkets = toSignal(this.#performantMarkets$);

  performantMarkets = computed(() => {
    const markets = this.#performantMarkets();
    return markets || [];
  });
}
