import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Position } from '../interfaces/position.interface';

@Injectable({ providedIn: 'root' })
export class PositionService {
  readonly #database = inject(AngularFireDatabase);

  #currentPosition$: Observable<Position> = this.#database
    .list<Position>('positions', (ref) =>
      ref.orderByChild('status').equalTo('open')
    )
    .valueChanges()
    .pipe(map((positions) => positions[0]));

  currentPosition = toSignal(this.#currentPosition$);

  openNewPosition(symbol: string) {
    this.#database.object('botEvents/openNewPosition').set(symbol);
  }

  closeCurrentPosition() {
    this.#database.object('botEvents/closeCurrentPosition').set(true);
  }
}
