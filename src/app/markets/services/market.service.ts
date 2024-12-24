import { computed, inject, Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { MarketScore } from '../interfaces/market-score.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class MarketService {
  readonly #database = inject(AngularFireDatabase);
  readonly #performantMarketsURL = '/manual-trading/performant-markets';

  #performantMarkets$: Observable<MarketScore[] | null> = this.#database.object<MarketScore[]>(this.#performantMarketsURL).valueChanges();

  #performantMarkets = toSignal(this.#performantMarkets$);

  performantMarkets = computed(() => {
    const markets = this.#performantMarkets();
    return markets || [];
  });
}
