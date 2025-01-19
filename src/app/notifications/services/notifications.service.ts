import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Notifications } from '../interfaces/notifications.interface';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  readonly #database = inject(AngularFireDatabase);
  readonly #url = '/manual-trading/notifications';

  notifications$: Observable<Notifications | null> = this.#database
    .object<Notifications>(this.#url)
    .valueChanges();

  notifications = toSignal(this.notifications$);

  saveNotifyEntrySignal(value: boolean): Promise<void> {
    return this.#database
      .object(`${this.#url}/notifyEntrySignal`)
      .set(value);
  }
}
