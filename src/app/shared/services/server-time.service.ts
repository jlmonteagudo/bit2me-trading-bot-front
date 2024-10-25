import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { webSocket } from "rxjs/webSocket";
import { filter, map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({ providedIn: 'root' })
export class ServerTimeService {
  readonly #WEBSOCKET_URL = environment.urls.websocket;
  readonly #websocketSubject = webSocket<string>(this.#WEBSOCKET_URL);

  readonly #serverTime$ = this.#websocketSubject.asObservable().pipe(
    filter((message: any) => message.event === 'server-time'),
    map((message: any) => message.data)
  );

  serverTime = toSignal(this.#serverTime$);
}
