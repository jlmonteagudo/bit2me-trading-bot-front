import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, filter, map } from 'rxjs';
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
    .pipe(
      map((positions) => positions[0]),
      filter((position) => !!position),
      map((position) => {
        position.profitPercentage = this.getProfitPercentage(position);
        return position;
      })
    );

  currentPosition = toSignal(this.#currentPosition$);

  openNewPosition(symbol: string) {
    this.#database.object('botEvents/openNewPosition').set(symbol);
  }

  closeCurrentPosition() {
    this.#database.object('botEvents/closeCurrentPosition').set(true);
  }

  #lastPositions$: Observable<Position[]> = this.#database
    .list<Position>('positions', (ref) => ref.orderByKey().limitToLast(10))
    .valueChanges()
    .pipe(
      map((positions) => positions.reverse()),
      map((positions) =>
        positions.map((position) => {
          position.profitPercentage = this.getProfitPercentage(position);
          return position;
        })
      )
    );

  lastPositions = toSignal(this.#lastPositions$);

  #positions$: Observable<Position[]> = this.#database
    .list<Position>('positions', (ref) => ref.orderByKey().limitToLast(100))
    .valueChanges()
    .pipe(
      map((positions) => positions.reverse()),
      map((positions) =>
        positions.map((position) => {
          position.profitPercentage = this.getProfitPercentage(position);
          return position;
        })
      )
    );

  positions = toSignal(this.#positions$);

  getProfitPercentage(position: Position): number {
    if (!position) return 0;
    return ((position.profit || 0) / position.entryQuoteAmount) * 100;
  }

  /*
  getPositionsPage(startKey?: string): Observable<any[]> {
    let query = this.#database.list('positions', (ref) => {
      return ref.orderByKey().limitToLast(11); // Obtener las últimas 11 posiciones
    });

    if (startKey) {
      query = this.#database.list('positions', (ref) => {
        return ref.orderByKey().endBefore(startKey).limitToLast(11); // Obtener las últimas 11 posiciones antes de la clave especificada
      });
    }

    return query.snapshotChanges().pipe(
      map((changes) => {
        // Eliminar el último elemento que es el que se usó para paginar
        changes.pop();
        return changes.reverse();
      })
    );
  }
  */
}
