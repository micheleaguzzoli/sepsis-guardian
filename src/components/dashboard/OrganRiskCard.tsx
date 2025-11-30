import { cn } from '@/lib/utils';
import { OrganRisk, getRiskLevel } from '@/types/patient';
import { TrendingUp, TrendingDown, Minus, Heart, Droplets, Wind, Activity, Pill } from 'lucide-react';

interface OrganRiskCardProps {
  risk: OrganRisk;
  compact?: boolean;
}

const organIcons = {
  kidney: Droplets,
  lung: Wind,
  liver: Pill,
  cardiac: Heart,
  coagulopathy: Activity,
};

const organLabels = {
  kidney: 'Kidney (AKI)',
  lung: 'Lung (ARDS)',
  liver: 'Liver',
  cardiac: 'Cardiac',
  coagulopathy: 'Coagulopathy',
};

const organColors = {
  kidney: 'organ-kidney',
  lung: 'organ-lung',
  liver: 'organ-liver',
  cardiac: 'organ-cardiac',
  coagulopathy: 'organ-coag',
};

export const OrganRiskCard = ({ risk, compact = false }: OrganRiskCardProps) => {
  const Icon = organIcons[risk.organ];
  const level = getRiskLevel(risk.riskScore);
  const colorVar = `var(--${organColors[risk.organ]})`;
  
  const TrendIcon = risk.trend === 'increasing' 
    ? TrendingUp 
    : risk.trend === 'decreasing' 
    ? TrendingDown 
    : Minus;

  const trendColor = risk.trend === 'increasing' 
    ? 'text-risk-critical' 
    : risk.trend === 'decreasing' 
    ? 'text-risk-low' 
    : 'text-muted-foreground';

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-2 rounded-md bg-secondary/50">
        <div 
          className="p-1.5 rounded"
          style={{ backgroundColor: `hsl(${colorVar} / 0.2)` }}
        >
          <Icon className="w-4 h-4" style={{ color: `hsl(${colorVar})` }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">{organLabels[risk.organ]}</p>
        </div>
        <div className="flex items-center gap-1">
          <span className={cn(
            'font-mono text-sm font-semibold',
            level === 'critical' && 'text-risk-critical',
            level === 'high' && 'text-risk-high',
            level === 'moderate' && 'text-risk-moderate',
            level === 'low' && 'text-risk-low',
            level === 'minimal' && 'text-risk-minimal',
          )}>
            {risk.riskScore}%
          </span>
          <TrendIcon className={cn('w-3 h-3', trendColor)} />
        </div>
      </div>
    );
  }

  return (
    <div className="organ-card">
      <div className="flex items-start justify-between mb-3">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: `hsl(${colorVar} / 0.15)` }}
        >
          <Icon className="w-5 h-5" style={{ color: `hsl(${colorVar})` }} />
        </div>
        <div className={cn('flex items-center gap-1', trendColor)}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-xs capitalize">{risk.trend}</span>
        </div>
      </div>
      
      <h4 className="text-sm font-medium text-foreground mb-1">
        {organLabels[risk.organ]}
      </h4>
      
      <div className="flex items-end gap-2 mb-3">
        <span className={cn(
          'text-3xl font-mono font-bold',
          level === 'critical' && 'text-risk-critical',
          level === 'high' && 'text-risk-high',
          level === 'moderate' && 'text-risk-moderate',
          level === 'low' && 'text-risk-low',
          level === 'minimal' && 'text-risk-minimal',
        )}>
          {risk.riskScore}
        </span>
        <span className="text-muted-foreground text-sm mb-1">% risk</span>
      </div>
      
      {/* Progress bar */}
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-3">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${risk.riskScore}%`,
            backgroundColor: `hsl(${colorVar})`,
          }}
        />
      </div>
      
      {/* Contributing factors */}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">Contributing Factors</p>
        {risk.contributingFactors.slice(0, 2).map((factor, idx) => (
          <p key={idx} className="text-xs text-foreground/80 truncate">• {factor}</p>
        ))}
      </div>
    </div>
  );
};
