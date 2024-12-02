import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Balance } from '../interfaces/balance';

@Injectable({ providedIn: 'root' })
export class BalanceService {
  readonly #database = inject(AngularFireDatabase);
  readonly #balanceURL = '/manual-trading/balances';

  #balances$: Observable<Balance[] | null> = this.#database
    .object<any>(this.#balanceURL)
    .valueChanges();

  balances = toSignal(this.#balances$, { initialValue: [] });

  balanceByCurrency(currency: string): Balance | undefined {
    return this.balances()?.find((balance) => balance.currency === currency);
  }
}
