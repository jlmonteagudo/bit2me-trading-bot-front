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
  timeframeInterval: string;
  numberOfCandles: number;
  validatePenultimateCandleVolume: boolean;
  validatePenultimateCandleVolumeFactor: number;
  validatePenultimateCandleIsPositive: boolean;
  validateResistance: boolean;
  validateResistanceFactor: number;
  validateSpread: boolean;
  validateSpreadLimitPercentage: number;
  validateSpreadAmountQuote: number;
}
