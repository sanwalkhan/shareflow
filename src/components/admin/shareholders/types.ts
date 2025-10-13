// src/components/admin/shareholders/types.ts

export interface Shareholder {
  id: number;
  name: string;
  email: string;
  equity: number;
  investment: number;
  profit: number;
  returns: number;
  otherMoney: number;
  joinDate: string;
}

export interface ShareholderFormData {
  id?: number;
  name: string;
  email: string;
  equity: string | number;
  investment: string | number;
  profit: string | number;
  returns: string | number;
  otherMoney: string | number;
  joinDate: string;
}

export interface QuickActionButtonProps {
  icon: string;
  label: string;
  color: string;
  onPress: () => void;
}

export interface ShareholderCardProps {
  shareholder: Shareholder;
  onEdit: (shareholder: Shareholder) => void;
  onDelete: (shareholder: Shareholder) => void;
}

export interface ShareholderFormModalProps {
  visible: boolean;
  mode: "add" | "edit";
  shareholder?: Shareholder | null;
  onSave: (data: ShareholderFormData) => void;
  onClose: () => void;
}

export interface ActionsModalProps {
  visible: boolean;
  action: string;
  onExecute: () => void;
  onClose: () => void;
  stats: {
    totalEquity: number;
    totalInvestment: number;
    totalProfit: number;
    totalReturns: number;
    totalOtherMoney: number;
    totalShareholders: number;
  };
}

export interface StatsOverviewProps {
  totalEquity: number;
  totalInvestment: number;
  totalProfit: number;
  totalReturns: number;
  totalOtherMoney: number;
  totalShareholders: number;
}

export interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onClear: () => void;
}

export interface EmptyStateProps {
  searchQuery?: string;
  onAddPress: () => void;
}
