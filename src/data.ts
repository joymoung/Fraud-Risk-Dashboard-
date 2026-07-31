import { TransactionTimeData, RecentTransaction } from './types';

export const hourlyData: TransactionTimeData[] = [
  { time: '00:00', volume: 1200, fraudRate: 2.1 },
  { time: '04:00', volume: 800, fraudRate: 3.5 },
  { time: '08:00', volume: 3400, fraudRate: 1.2 },
  { time: '12:00', volume: 5600, fraudRate: 0.8 },
  { time: '16:00', volume: 4800, fraudRate: 1.5 },
  { time: '20:00', volume: 2900, fraudRate: 2.8 },
];

export const dailyData = [
  { day: 'Mon', transactions: 45000, fraud: 320 },
  { day: 'Tue', transactions: 52000, fraud: 280 },
  { day: 'Wed', transactions: 48000, fraud: 410 },
  { day: 'Thu', transactions: 61000, fraud: 390 },
  { day: 'Fri', transactions: 59000, fraud: 450 },
  { day: 'Sat', transactions: 38000, fraud: 520 },
  { day: 'Sun', transactions: 35000, fraud: 480 },
];

export const recentTransactions: RecentTransaction[] = [
  { id: 'TXN-8923', date: '2023-10-27 14:32:01', amount: 1250.00, cardCategory: 101, riskScore: 0.92, isHighRisk: true },
  { id: 'TXN-8924', date: '2023-10-27 14:35:12', amount: 45.50, cardCategory: 102, riskScore: 0.05, isHighRisk: false },
  { id: 'TXN-8925', date: '2023-10-27 14:41:55', amount: 300.00, cardCategory: 101, riskScore: 0.78, isHighRisk: true },
  { id: 'TXN-8926', date: '2023-10-27 14:50:22', amount: 12.99, cardCategory: 104, riskScore: 0.01, isHighRisk: false },
  { id: 'TXN-8927', date: '2023-10-27 15:02:10', amount: 850.00, cardCategory: 103, riskScore: 0.65, isHighRisk: true },
  { id: 'TXN-8928', date: '2023-10-27 15:15:33', amount: 150.25, cardCategory: 101, riskScore: 0.12, isHighRisk: false },
  { id: 'TXN-8929', date: '2023-10-27 15:22:41', amount: 2500.00, cardCategory: 102, riskScore: 0.98, isHighRisk: true },
];

export const riskDistribution = [
  { name: 'Low Risk (0-0.2)', value: 75, color: '#10b981' }, // emerald-500
  { name: 'Medium Risk (0.2-0.5)', value: 15, color: '#f59e0b' }, // amber-500
  { name: 'High Risk (0.5-0.8)', value: 7, color: '#f97316' }, // orange-500
  { name: 'Critical Risk (0.8-1.0)', value: 3, color: '#ef4444' }, // red-500
];
