import { cn } from '@/lib/utils';
import { getRiskLevel, RiskLevel } from '@/types/patient';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface RiskIndicatorProps {
  score: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  trend?: 'increasing' | 'stable' | 'decreasing';
  className?: string;
}

const sizeClasses = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-14 h-14 text-lg',
  lg: 'w-20 h-20 text-2xl',
  xl: 'w-28 h-28 text-4xl',
};

const riskStyles: Record<RiskLevel, string> = {
  critical: 'bg-risk-critical/20 text-risk-critical border-risk-critical/50 shadow-[0_0_20px_hsl(var(--risk-critical)/0.3)]',
  high: 'bg-risk-high/20 text-risk-high border-risk-high/50',
  moderate: 'bg-risk-moderate/20 text-risk-moderate border-risk-moderate/50',
  low: 'bg-risk-low/20 text-risk-low border-risk-low/50',
  minimal: 'bg-risk-minimal/20 text-risk-minimal border-risk-minimal/50',
};

const TrendIcon = ({ trend }: { trend?: string }) => {
  if (trend === 'increasing') return <TrendingUp className="w-3 h-3" />;
  if (trend === 'decreasing') return <TrendingDown className="w-3 h-3" />;
  return <Minus className="w-3 h-3" />;
};

export const RiskIndicator = ({ 
  score, 
  size = 'md', 
  showLabel = false, 
  trend,
  className 
}: RiskIndicatorProps) => {
  const level = getRiskLevel(score);
  
  return (
    <div className={cn('flex flex-col items-center gap-1', className)}>
      <div
        className={cn(
          'rounded-full border-2 flex items-center justify-center font-mono font-bold transition-all duration-300',
          sizeClasses[size],
          riskStyles[level],
          level === 'critical' && 'animate-pulse-glow'
        )}
      >
        {score}%
      </div>
      {showLabel && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="capitalize">{level}</span>
          {trend && <TrendIcon trend={trend} />}
        </div>
      )}
    </div>
  );
};
