import { scoreTiers } from '../theme/palette';

export interface ScoreTierInfo {
  tierKey: 'needsWork' | 'fair' | 'good' | 'excellent';
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export const getScoreTier = (score: number): ScoreTierInfo => {
  if (score <= 560) {
    return {
      tierKey: 'needsWork',
      label: scoreTiers.needsWork.label,
      color: scoreTiers.needsWork.main,
      bgColor: scoreTiers.needsWork.light,
      textColor: scoreTiers.needsWork.dark,
    };
  }
  if (score <= 720) {
    return {
      tierKey: 'fair',
      label: scoreTiers.fair.label,
      color: scoreTiers.fair.main,
      bgColor: scoreTiers.fair.light,
      textColor: scoreTiers.fair.dark,
    };
  }
  if (score <= 880) {
    return {
      tierKey: 'good',
      label: scoreTiers.good.label,
      color: scoreTiers.good.main,
      bgColor: scoreTiers.good.light,
      textColor: scoreTiers.good.dark,
    };
  }
  return {
    tierKey: 'excellent',
    label: scoreTiers.excellent.label,
    color: scoreTiers.excellent.main,
    bgColor: scoreTiers.excellent.light,
    textColor: scoreTiers.excellent.dark,
  };
};

export const getImpactLevelColor = (level: 'High' | 'Medium' | 'Low'): string => {
  switch (level) {
    case 'High':
      return '#E53935';
    case 'Medium':
      return '#FB8C00';
    case 'Low':
      return '#00897B';
    default:
      return '#64748B';
  }
};
