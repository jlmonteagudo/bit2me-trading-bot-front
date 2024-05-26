import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Balance } from '../interfaces/balance';

@Injectable({ providedIn: 'root' })
export class BalanceService {
  readonly #database = inject(AngularFireDatabase);

  #balances$: Observable<Balance[] | null> = this.#database
    .object<any>('balances')
    .valueChanges()
    .pipe(map((balances) => JSON.parse(balances)));

  balances = toSignal(this.#balances$, { initialValue: [] });

  balanceByCurrency(currency: string): Balance | undefined {
    return this.balances()?.find((balance) => balance.currency === currency);
  }
}
