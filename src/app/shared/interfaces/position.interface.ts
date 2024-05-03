export interface Position {
  id: number;
  symbol: string;
  status: string;
  entryOrderId: string;
  exitOrderId: string;
  positionBaseAmount: number;
  entryPrice: number;
  exitPrice: number;
  entryQuoteAmount: number;
  exitQuoteAmount?: number;
  profit?: number;
  entryDatetime: number;
  exitDatetime?: number;
}
