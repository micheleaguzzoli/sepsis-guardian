import { ManagementPlan } from '@/types/patient';
import { cn } from '@/lib/utils';
import { ClipboardList, Clock, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

interface ManagementPlanCardProps {
  plans: ManagementPlan[];
}

const priorityConfig = {
  critical: {
    icon: AlertTriangle,
    bg: 'bg-destructive/15',
    border: 'border-destructive/30',
    text: 'text-destructive',
    badge: 'bg-destructive text-destructive-foreground',
  },
  high: {
    icon: AlertCircle,
    bg: 'bg-risk-high/15',
    border: 'border-risk-high/30',
    text: 'text-risk-high',
    badge: 'bg-risk-high text-primary-foreground',
  },
  moderate: {
    icon: Info,
    bg: 'bg-risk-moderate/15',
    border: 'border-risk-moderate/30',
    text: 'text-risk-moderate',
    badge: 'bg-risk-moderate text-primary-foreground',
  },
  low: {
    icon: CheckCircle,
    bg: 'bg-risk-low/15',
    border: 'border-risk-low/30',
    text: 'text-risk-low',
    badge: 'bg-risk-low text-primary-foreground',
  },
};

export const ManagementPlanCard = ({ plans }: ManagementPlanCardProps) => {
  const sortedPlans = [...plans].sort((a, b) => {
    const order = { critical: 0, high: 1, moderate: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-primary" />
          Clinical Management Plan
        </h3>
        <span className="text-xs text-muted-foreground">AI-Generated • Review Required</span>
      </div>
      
      <div className="space-y-2">
        {sortedPlans.map((plan, idx) => {
          const config = priorityConfig[plan.priority];
          const Icon = config.icon;
          
          return (
            <div
              key={idx}
              className={cn(
                'p-3 rounded-lg border transition-all hover:border-primary/30',
                config.bg,
                config.border,
                'slide-in'
              )}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn('w-5 h-5 mt-0.5 flex-shrink-0', config.text)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      'text-xs font-semibold px-2 py-0.5 rounded',
                      config.badge
                    )}>
                      {plan.category}
                    </span>
                    <span className={cn(
                      'text-xs px-2 py-0.5 rounded bg-secondary',
                      config.text
                    )}>
                      {plan.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{plan.recommendation}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{plan.timing}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
