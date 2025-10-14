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
  isMobile?: boolean;
}

export interface ShareholderCardProps {
  shareholder: Shareholder;
  onEdit: (shareholder: Shareholder) => void;
  onDelete: (shareholder: Shareholder) => void;
  isMobile?: boolean;
  isTablet?: boolean;
}

export interface ShareholderFormModalProps {
  visible: boolean;
  mode: "add" | "edit";
  shareholder?: Shareholder | null;
  onSave: (data: ShareholderFormData) => void;
  onClose: () => void;
  isMobile?: boolean;
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
  isMobile?: boolean;
}

export interface StatsOverviewProps {
  totalEquity: number;
  totalInvestment: number;
  totalProfit: number;
  totalReturns: number;
  totalOtherMoney: number;
  totalShareholders: number;
  isMobile?: boolean;
  isTablet?: boolean;
}

export interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onClear: () => void;
  isMobile?: boolean;
}

export interface EmptyStateProps {
  searchQuery?: string;
  onAddPress: () => void;
  isMobile?: boolean;
}

// New responsive layout types
export interface ResponsiveLayoutProps {
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
}

export interface CardLayoutProps {
  compact?: boolean;
  horizontal?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Enhanced modal types for responsive behavior
export interface ResponsiveModalProps {
  isMobile?: boolean;
  maxWidth?: number;
  fullScreen?: boolean;
}

// Form field types for responsive forms
export interface FormFieldProps {
  label: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  isMobile?: boolean;
  multiline?: boolean;
}

// Grid layout types for responsive stats
export interface GridLayoutProps {
  columns?: number;
  gap?: number;
  responsive?: boolean;
}

// Data display types
export interface DataDisplayProps {
  label: string;
  value: string | number;
  format?: 'currency' | 'percentage' | 'number' | 'date';
  size?: 'sm' | 'md' | 'lg';
  isMobile?: boolean;
}

// Action button types
export interface ActionButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  isMobile?: boolean;
}

// List container types
export interface ListContainerProps {
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  keyExtractor: (item: any, index: number) => string;
  emptyComponent?: React.ReactNode;
  loading?: boolean;
  refreshControl?: React.ReactElement;
  isMobile?: boolean;
}

// Section header types
export interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  isMobile?: boolean;
}

// Filter types for responsive filter components
export interface FilterProps {
  filters: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
  isMobile?: boolean;
}

// Pagination types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isMobile?: boolean;
}

// Search and filter combo types
export interface SearchFilterComboProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: Record<string, any>;
  onFilterChange: (filters: Record<string, any>) => void;
  isMobile?: boolean;
}

// Chart data types for responsive charts
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps {
  data: ChartDataPoint[];
  type: 'bar' | 'pie' | 'line' | 'donut';
  height?: number;
  isMobile?: boolean;
}

// Export data types
export interface ExportOptions {
  format: 'csv' | 'pdf' | 'excel';
  includeCharts?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Notification types
export interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  isMobile?: boolean;
}

// Loading states
export interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  isMobile?: boolean;
}

// Empty states with responsive variations
export interface EmptyStateConfig {
  title: string;
  description: string;
  icon: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  isMobile?: boolean;
}

// Responsive breakpoints configuration
export interface Breakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

// Theme configuration for responsive design
export interface ResponsiveTheme {
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: { size: number; lineHeight: number };
    h2: { size: number; lineHeight: number };
    h3: { size: number; lineHeight: number };
    body: { size: number; lineHeight: number };
    caption: { size: number; lineHeight: number };
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}