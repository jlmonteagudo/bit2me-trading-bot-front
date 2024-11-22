import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly #database = inject(AngularFireDatabase);
  readonly #url = '/manual-trading/settings';

  #feePercentage$: Observable<number> = this.#database
    .object<any>(this.#url)
    .valueChanges()
    .pipe(
      map((settings) => settings.feePercentage),
    );

  feePercentage = toSignal(this.#feePercentage$);
}
