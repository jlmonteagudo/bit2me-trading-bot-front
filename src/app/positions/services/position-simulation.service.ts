import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, filter, map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Position } from '../interfaces/position.interface';

@Injectable({ providedIn: 'root' })
export class PositionSimulationService {
  readonly #database = inject(AngularFireDatabase);
  readonly #positions_url = '/manual-trading/simulation/positions';
  readonly #commands_url = '/manual-trading/commands';

  #currentPosition$: Observable<Position> = this.#database
    .list<Position>(this.#positions_url, (ref) =>
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
    );

  currentPosition = toSignal(this.#currentPosition$);

  openNewPosition(symbol: string, quoteOrderAmount: number) {
    this.#database.object(`${this.#commands_url}/createPosition`).set({ symbol, quoteOrderAmount, simulation: true });
  }

  closePosition(id: string) {
    this.#database.object(`${this.#commands_url}/closePosition`).set({ id, simulation: true });
  }

  #lastPositions$: Observable<Position[]> = this.#database
    .list<Position>(this.#positions_url, (ref) => ref.orderByKey().limitToLast(20))
    .valueChanges()
    .pipe(
      map((positions) => positions.reverse()),
    );

  lastPositions = toSignal(this.#lastPositions$);

  #positions$: Observable<Position[]> = this.#database
    .list<Position>(this.#positions_url, (ref) => ref.orderByKey().limitToLast(100))
    .valueChanges()
    .pipe(
      map((positions) => positions.reverse()),
    );

  positions = toSignal(this.#positions$);
}
