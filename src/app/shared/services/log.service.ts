import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class LogService {
  readonly #WEBSOCKET_URL = environment.urls.websocket;
  readonly #websocketSubject = webSocket<string>(this.#WEBSOCKET_URL);

  readonly #logMessage$ = this.#websocketSubject.asObservable().pipe(
    filter((message: any) => message.event === 'log'),
    map((message: any) => message.data)
  );

  logMessage = toSignal(this.#logMessage$);
}
