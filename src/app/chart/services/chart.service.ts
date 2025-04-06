import { toSignal } from '@angular/core/rxjs-interop';
import { computed, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Volume } from './../interfaces/volume.interface';
import { Candle } from './../interfaces/candle.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChartService {
    readonly #API_URL = environment.urls.api;
    readonly #httpClient = inject(HttpClient);

    ohlcv: WritableSignal<any> = signal([])

    async loadOHLCV(symbol: string, interval: string, limit: number): Promise<void> {
        const params = new HttpParams({ fromObject: { symbol, interval, numberOfCandles: limit } });
        const response = this.#httpClient.get(`${this.#API_URL}/candles`, { params });
        this.ohlcv.set(await lastValueFrom(response));
    }

    candles: Signal<Candle[]> = computed(() => this.ohlcv().map((ohlcv: number[]) => ({
        time: Math.floor(ohlcv[0] / 1000),
        open: ohlcv[1],
        high: ohlcv[2],
        low: ohlcv[3],
        close: ohlcv[4],
    })));

    volume: Signal<Volume[]> = computed(() => this.ohlcv().map((ohlcv: number[]) => ({
        time: Math.floor(ohlcv[0] / 1000),
        value: ohlcv[5],
    })));
}
