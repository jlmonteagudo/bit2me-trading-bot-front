import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Settings } from './../interfaces/settings.interface';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly #database = inject(AngularFireDatabase);
  readonly #url = '/manual-trading/settings';

  settings$: Observable<Settings | null> = this.#database
    .object<Settings>(this.#url)
    .valueChanges();

  settings = toSignal(this.settings$);

  saveSettings(settings: Partial<Settings>): Promise<void> {
    return this.#database
      .object(this.#url)
      .update(settings);
  }
}
