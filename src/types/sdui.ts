export type SDUIComponentType =
  | 'container'
  | 'card'
  | 'typography'
  | 'metric_gauge'
  | 'metric_card'
  | 'progress_bar'
  | 'recharts_composed'
  | 'recharts_pie'
  | 'recharts_bar'
  | 'impact_list'
  | 'alert_banner'
  | 'action_card'
  | 'accordion_faq'
  | 'button'
  | 'divider';

export type SDContainerLayout = 'stack' | 'grid' | 'row' | 'flex';

export interface SDUIResponsiveColumns {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}

export interface SDUIStyles {
  padding?: number | string;
  margin?: number | string;
  backgroundColor?: string;
  borderRadius?: number | string;
  borderColor?: string;
  borderWidth?: number;
  elevation?: number;
  maxWidth?: number | string;
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  gap?: number | string;
}

export interface MetricGaugeProps {
  title?: string;
  subtitle?: string;
  value: number;
  min: number;
  max: number;
  status_text?: string;
  color?: string;
  show_needle?: boolean;
  score_tiers?: Array<{
    name: string;
    range: [number, number];
    color: string;
  }>;
  bullet_points?: string[];
}

export interface MetricCardStatItem {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  subtext?: string;
}

export interface MetricCardProps {
  title?: string;
  stats: MetricCardStatItem[];
  layout?: 'grid' | 'row';
}

export interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  unit?: string;
  displayValue?: string;
  color?: string;
  statusText?: string;
  subtext?: string;
}

export interface RechartsSeriesConfig {
  type: 'line' | 'bar' | 'area';
  dataKey: string;
  name?: string;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  dot?: boolean;
}

export interface RechartsComposedProps {
  config: {
    height?: number;
    xAxisKey?: string;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
  };
  series: RechartsSeriesConfig[];
  data: Array<Record<string, any>>;
}

export interface RechartsPieProps {
  config: {
    height?: number;
    innerRadius?: number;
    outerRadius?: number;
    dataKey?: string;
    nameKey?: string;
    showTooltip?: boolean;
    showLegend?: boolean;
    centerText?: string;
    centerSubtext?: string;
  };
  data: Array<{
    category: string;
    value: number;
    fill?: string;
    [key: string]: any;
  }>;
}

export interface RechartsBarProps {
  config: {
    height?: number;
    xAxisKey?: string;
    showGrid?: boolean;
    showTooltip?: boolean;
    showLegend?: boolean;
    layout?: 'horizontal' | 'vertical';
  };
  series: Array<{
    dataKey: string;
    name?: string;
    fill?: string;
  }>;
  data: Array<Record<string, any>>;
}

export interface ImpactFactorItem {
  id: string;
  title: string;
  impactLevel: 'High' | 'Medium' | 'Low';
  statusText: string;
  statusColor?: string;
  description: string;
  icon?: string;
  metric?: string;
}

export interface ImpactListProps {
  title?: string;
  subtitle?: string;
  items: ImpactFactorItem[];
}

export interface AlertBannerProps {
  title: string;
  message?: string;
  severity?: 'info' | 'warning' | 'error' | 'success';
  items?: Array<{
    label: string;
    value: string;
    subvalue?: string;
  }>;
}

export interface ActionCardProps {
  badge?: string;
  title: string;
  description: string;
  features?: string[];
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  highlightColor?: string;
}

export interface AccordionFAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionFAQProps {
  title?: string;
  items: AccordionFAQItem[];
}

export interface TypographyProps {
  text: string;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'badge';
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  fontWeight?: number | string;
  badgeVariant?: 'filled' | 'outlined';
}

export interface ButtonProps {
  text: string;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  actionType?: 'url' | 'dialog' | 'custom';
  url?: string;
}

export interface SDUIComponentNode {
  id: string;
  type: SDUIComponentType;
  is_hidden?: boolean;
  layout?: SDContainerLayout;
  columns?: SDUIResponsiveColumns;
  styles?: SDUIStyles;
  elevation?: 'none' | 'sm' | 'md' | 'lg' | number;
  props?: Record<string, any>;
  children?: SDUIComponentNode[];
  // Direct props shorthands for ease of schema
  title?: string;
  subtitle?: string;
  text?: string;
  variant?: string;
  value?: number;
  min?: number;
  max?: number;
  status_text?: string;
  color?: string;
  config?: Record<string, any>;
  series?: any[];
  data?: any[];
  stats?: any[];
  items?: any[];
}

export interface ReportPayload {
  report_id: string;
  title: string;
  subtitle?: string;
  version: string;
  last_updated?: string;
  next_update?: string;
  theme_config?: {
    primaryColor?: string;
    secondaryColor?: string;
    borderRadius?: number;
  };
  content: SDUIComponentNode[];
}
