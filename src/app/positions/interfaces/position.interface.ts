export interface Position {
  id: string;
  symbol: string;
  status: string;
  baseAmount: number;
  feePercentage: number;
  profit: number;
  profitPercentage: number;
  stopLossCost: number;
  takeProfitCost: number;
  entryOrderId: string;
  entryAt: number;
  entryPrice: number;
  entryCost: number;
  exitOrderId: string;
  exitPrice: number;
  exitCost: number;
  exitAt: number;
  lowerProfitPercentage?: number;
}
