export interface Ticker {
  timestamp: number;
  symbol: string;
  open: number;
  close: number;
  bid: number;
  ask: number;
  high: number;
  low: number;
  baseVolume: number;
  percentage: number;
  quoteVolume: number;
}
