export interface Shareholder {
  id: string;
  name: string;
  email: string;
  sharePercentage: number;
  allocatedAmount: number;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  type: 'routine' | 'special';
  category: string;
  date: Date;
  description: string;
  receipt: string | null;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;
  createdAt: Date;
  shareholders: Shareholder[];
  taxDeductible: boolean;
  recurring: boolean;
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  budgetCategory: string;
}

export interface Budget {
  total: number;
  used: number;
  remaining: number;
  categories: {
    [key: string]: {
      allocated: number;
      used: number;
      remaining: number;
    };
  };
}
