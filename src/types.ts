export interface TransactionTimeData {
  time: string;
  volume: number;
  fraudRate: number;
}

export interface RecentTransaction {
  id: string;
  date: string;
  amount: number;
  cardCategory: number;
  riskScore: number;
  isHighRisk: boolean;
}
