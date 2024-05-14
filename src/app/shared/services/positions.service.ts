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

  #lastPositions$: Observable<Position[]> = this.#database
    .list<Position>('positions', (ref) => ref.orderByKey().limitToLast(10))
    .valueChanges()
    .pipe(map((positions) => positions.reverse()));

  lastPositions = toSignal(this.#lastPositions$);

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
