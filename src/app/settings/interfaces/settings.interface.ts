export interface Settings {
  initialTakeProfitPercentage: number;
  initialStopLossPercentage: number;
  trailingTakeProfitPercentage: number;
  trailingStopLossPercentage: number;
  quoteCurrency: string;
  quoteVolumeLimit: number;
  emaFastPeriod: number;
  emaSlowPeriod: number;
  rsiPeriod: number;
}
