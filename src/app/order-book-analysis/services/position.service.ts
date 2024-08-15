import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Position } from '../interfaces/position.interface';

@Injectable({ providedIn: 'root' })
export class PositionService {
  readonly #database = inject(AngularFireDatabase);
  readonly #url = '/strategies/manual-order-book-analysis';

  #currentPosition$: Observable<Position> = this.#database
    .list<Position>(`${this.#url}/positions`, (ref) =>
      ref.orderByChild('status').equalTo('open')
    )
    .snapshotChanges()
    .pipe(
      map((positions) => {
        return positions.map(position => {
          return {
            id: position.payload.key,
            ...position.payload.val()
          } as Position
        })
      }),
      map((positions) => positions[0]),
      filter((position) => !!position),
    );

  currentPosition = toSignal(this.#currentPosition$);

  openNewPosition(symbol: string, quoteOrderAmount: number) {
    this.#database.object(`${this.#url}/commands/createPosition`).set({ symbol, quoteOrderAmount, simulation: false });
  }

  closePosition(id: string) {
    this.#database.object(`${this.#url}/commands/closePosition`).set({ id, simulation: false });
  }

  #lastPositions$: Observable<Position[]> = this.#database
    .list<Position>(`${this.#url}/positions`, (ref) => ref.orderByKey().limitToLast(20))
    .valueChanges()
    .pipe(
      map((positions) => positions.reverse()),
    );

  lastPositions = toSignal(this.#lastPositions$);

  #positions$: Observable<Position[]> = this.#database
    .list<Position>(`${this.#url}/positions`, (ref) => ref.orderByKey().limitToLast(100))
    .valueChanges()
    .pipe(
      map((positions) => positions.reverse()),
    );

  positions = toSignal(this.#positions$);
}
