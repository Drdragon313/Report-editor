export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (val: number): string => {
  return new Intl.NumberFormat('en-US').format(val);
};

export const formatPercent = (val: number): string => {
  return `${Math.round(val)}%`;
};

export const formatDate = (dateStr?: string): string => {
  if (!dateStr) return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const date = new Date(dateStr);
  return isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};
