export interface Position {
  id: string;
  symbol: string;
  baseAmount: number;
  entryQuoteAmount: number;
  exitQuoteAmount: number;
  profit: number;
  status: string;
  entryAt: Date;
  exitAt: Date;
  entryAveragePrice: number;
  exitAveragePrice: number;
  stopLossCost: number;
  takeProfitCost: number;
}
