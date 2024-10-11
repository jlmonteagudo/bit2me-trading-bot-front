import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({ providedIn: 'root' })
export class OrderBookService {
  // readonly #WEBSOCKET_URL = 'ws://localhost:8080';
  readonly #WEBSOCKET_URL = 'wss://orca-app-jkafl.ondigitalocean.app';
  readonly #websocketSubject = webSocket<string>(this.#WEBSOCKET_URL);

  readonly #exitQuoteAmount$ = this.#websocketSubject.asObservable().pipe(
    takeUntilDestroyed(),
    filter((message: any) => message.event === 'exit-quote-amount'),
    tap((message: any) => this.exitQuoteAmount.set(message.data))
  ).subscribe();

  exitQuoteAmount = signal(0);


  // readonly #orderBook$ = this.#websocketSubject.asObservable().pipe(
  //   takeUntilDestroyed(),
  //   filter((message: any) => message.event === 'order-book'),
  //   tap((message: any) => this.orderBook.set(message.data))
  // ).subscribe();

  // orderBook = signal({
  //   bids: [[]],
  //   asks: [[]]
  // });

  // getSellQuote(amountToSell: number): number {
  //   let sellQuote = 0;
  //   let remainingAmountToSell = amountToSell;

  //   for (const [price, volume] of this.orderBook().bids) {
  //     if (volume <= remainingAmountToSell) {
  //       sellQuote += (price * volume);
  //       remainingAmountToSell -= volume;
  //     } else {
  //       sellQuote += (remainingAmountToSell * price);
  //       break;
  //     }
  //   }

  //   return sellQuote;
  // }
}
