import { Component, OnInit, inject, input, model } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CandleService } from '../../shared/services/candle.service';
import { lastValueFrom, interval, tap } from 'rxjs';

const NUMBER_OF_CANDLES = 50;
const POLLING_MILLISECONDS = 5000;

@Component({
  selector: 'app-candles-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './candles-chart.component.html',
  styleUrl: './candles-chart.component.scss',
})
export class CandlesChartComponent implements OnInit {
  readonly #candleService = inject(CandleService);

  symbol = input<string>();
  interval = model<string>();

  chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          data: [],
        },
      ],
      colors: [],
      chart: {
        type: 'candlestick',
        height: 490,
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: 'rgb(38, 191, 148)',
            downward: 'rgb(230, 83, 60)',
          },
          wick: {
            useFillColor: true,
          },
        },
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    };

    interval(POLLING_MILLISECONDS)
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.loadCandles(this.symbol(), this.interval()))
      )
      .subscribe();
  }

  ngOnInit() {
    this.loadCandles(this.symbol(), this.interval());
  }

  async loadCandles(symbol: string | undefined, interval: string | undefined) {
    if (!symbol || !interval) return;

    this.interval.set(interval);

    const candles = await lastValueFrom(
      this.#candleService.getCandles(symbol, interval, NUMBER_OF_CANDLES)
    );

    const formattedCandles = candles.map((candle) => ({
      x: new Date(candle[0]),
      y: [candle[1], candle[2], candle[3], candle[4]],
    }));

    this.chartOptions.series = [
      {
        data: formattedCandles,
      },
    ];
  }
}
