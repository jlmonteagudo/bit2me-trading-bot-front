import { ChangeDetectionStrategy, Component, effect, inject, OnInit, ElementRef, ViewChild, input, signal, OnDestroy, computed } from '@angular/core';
import { createChart, IChartApi, CandlestickSeries, HistogramSeries, ColorType, LineSeries, createSeriesMarkers, SeriesMarkerBarPosition, SeriesMarkerPricePosition, SeriesMarkerShape, ISeriesMarkersPluginApi } from 'lightweight-charts';
import { ema } from 'indicatorts';

import { ChartService } from '../../services/chart.service';
import { PositionService } from '../../../positions/services/position.service';
import { Candle } from '../../interfaces/candle.interface';

const NUMBER_OF_CANDLES = 100;

const chartTheme = {
  light: {
    layoutBackgroundColor: '#ffffff',
    layoutTextColor: '#000000',
    gridLineColor: '#e0e0e0',
    upColor: '#26a69a',
    downColor: '#ef5350'
  },
  dark: {
    layoutBackgroundColor: '#1e1e1e',
    layoutTextColor: '#d1d4dc',
    gridLineColor: '#2b2b2b',
    upColor: '#26a69a',
    downColor: '#ef5350'
  }
}

@Component({
  selector: 'app-price-chart',
  standalone: true,
  imports: [],
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceChartComponent implements OnInit, OnDestroy {
  readonly #chartService = inject(ChartService);
  readonly #positionService = inject(PositionService);

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  private chart!: IChartApi;
  private candlestickSeries: any;
  private histogramSeries: any;
  private emaFastSeries: any;
  private emaSlowSeries: any;
  private seriesMarkers: ISeriesMarkersPluginApi<any> = {} as ISeriesMarkersPluginApi<any>;

  symbol = input.required<string>();
  timeFrame = signal('1m');

  candles = this.#chartService.candles;
  volume = this.#chartService.volume;
  currentPosition = this.#positionService.currentPosition;

  currentPositionPrice = computed(() => this.currentPosition()?.entryPrice || 85000);

  timeFrameInterval: any;

  #symbolEffect = effect(() => {
    this.#chartService.loadOHLCV(this.symbol(), this.timeFrame(), NUMBER_OF_CANDLES);
  });

  #candlesEffect = effect(() => {
    const chartTheme = this.getChartTheme();
    const volumeData = this.volume();
    const candlesData = this.candles();

    if (!candlesData) return;

    const histogramData = volumeData.map((vol: any, index: number) => {
      const currentCandle = candlesData[index];
      const previousCandle = candlesData[index - 1];

      const color =
        previousCandle && currentCandle.close > previousCandle.close
          ? chartTheme.upColor
          : chartTheme.downColor;

      return {
        time: vol.time,
        value: vol.value,
        color: color,
      };
    });

    this.histogramSeries.setData(histogramData);

    const candlestickData = candlesData.map((candle: any) => ({
      time: candle.time,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));

    this.candlestickSeries.setData(candlestickData);

    const candlestickClosePrices = candlesData.map((candle: any) => candle.close);
    const emaFast = ema(candlestickClosePrices, { period: 12 });
    const emaSlow = ema(candlestickClosePrices, { period: 26 });

    const emaFastData = emaFast.map((ema: any, index: number) => {
      return {
        time: candlesData[index].time,
        value: ema,
      };
    });

    const emaSlowData = emaSlow.map((ema: any, index: number) => {
      return {
        time: candlesData[index].time,
        value: ema,
      };
    });

    this.emaFastSeries.setData(emaFastData);
    this.emaSlowSeries.setData(emaSlowData);

    this.displayMarkers();
  });

  private displayMarkers() {
    if (!this.currentPosition() || this.currentPositionPrice() <= 0 || this.currentPosition()?.symbol !== this.symbol() || !this.candlestickSeries) return;

    const candlesData = this.candles();

    if (!candlesData || candlesData.length === 0) return;

    const markerTime = this.getCandleTimeForEntry(this.currentPosition()!.entryAt, candlesData);

    if (!markerTime) return;

    const markers = [
      {
        time: markerTime,
        position: 'belowBar' as SeriesMarkerBarPosition,
        color: '#2196F3',
        shape: 'arrowUp' as SeriesMarkerShape,
        text: `Buy at ${this.currentPositionPrice()}`,
        price: this.currentPositionPrice()
      },
    ];

    this.seriesMarkers.setMarkers([]);
    this.seriesMarkers.setMarkers(markers);
  };

  private getCandleTimeForEntry(entryAt: number, candles: Candle[]): number | null {
    if (!candles || candles.length === 0) return null;

    entryAt = entryAt / 1000;

    for (let i = 0; i < candles.length - 1; i++) {
      const currentCandle = candles[i];
      const nextCandle = candles[i + 1];

      if (entryAt >= currentCandle.time && entryAt < nextCandle.time) {
        return currentCandle.time;
      }
    }

    const lastCandle = candles[candles.length - 1];
    if (entryAt >= lastCandle.time) {
      return lastCandle.time;
    }

    return null;
  }

  private getChartTheme() {
    return localStorage.getItem('ynex-theme-mode') === 'dark' ? chartTheme.dark : chartTheme.light;
  };

  ngOnInit(): void {
    this.loadData();

    const chartTheme = this.getChartTheme();

    this.chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.offsetWidth,
      height: 400,
      layout: {
        background: { type: ColorType.Solid, color: chartTheme.layoutBackgroundColor },
        textColor: chartTheme.layoutTextColor,
      },
      grid: {
        vertLines: {
          color: chartTheme.gridLineColor,
        },
        horzLines: {
          color: chartTheme.gridLineColor,
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    this.histogramSeries = this.chart.addSeries(HistogramSeries, {
      color: chartTheme.upColor,
      priceFormat: {
        type: 'volume',
      },
    });

    this.candlestickSeries = this.chart.addSeries(CandlestickSeries, {
      upColor: chartTheme.upColor, downColor: chartTheme.downColor, borderVisible: false,
      wickUpColor: chartTheme.upColor, wickDownColor: chartTheme.downColor,
    }, 1);

    this.emaFastSeries = this.chart.addSeries(LineSeries, {
      color: 'blue',
      lineWidth: 1,
    }, 1);

    this.emaSlowSeries = this.chart.addSeries(LineSeries, {
      color: 'orange',
      lineWidth: 1,
    }, 1);

    this.seriesMarkers = createSeriesMarkers(this.candlestickSeries, []);

    const candlesPane = this.chart.panes()[1];

    candlesPane.moveTo(0);
    candlesPane.setHeight(300);

    this.chart.timeScale().fitContent();
  }

  loadData(): void {
    this.timeFrameInterval = setInterval(() => {
      this.#chartService.loadOHLCV(this.symbol(), this.timeFrame(), NUMBER_OF_CANDLES);
    }, 5000);
  }

  onTimeFrameChange(value: string) {
    this.timeFrame.set(value);
  }

  ngOnDestroy(): void {
    if (this.timeFrameInterval) {
      clearInterval(this.timeFrameInterval);
    }
  }
}
