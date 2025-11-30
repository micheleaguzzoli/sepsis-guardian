import { Patient, getRiskLevel } from '@/types/patient';
import { AlertTriangle, AlertCircle, Activity, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsOverviewProps {
  patients: Patient[];
}

export const StatsOverview = ({ patients }: StatsOverviewProps) => {
  const criticalCount = patients.filter(p => getRiskLevel(p.sepsisRiskScore) === 'critical').length;
  const highCount = patients.filter(p => getRiskLevel(p.sepsisRiskScore) === 'high').length;
  const increasingCount = patients.filter(p => p.sepsisRiskTrend === 'increasing').length;

  const stats = [
    {
      label: 'Total Patients',
      value: patients.length,
      icon: Users,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Critical Risk',
      value: criticalCount,
      icon: AlertTriangle,
      color: 'text-risk-critical',
      bg: 'bg-risk-critical/10',
      pulse: criticalCount > 0,
    },
    {
      label: 'High Risk',
      value: highCount,
      icon: AlertCircle,
      color: 'text-risk-high',
      bg: 'bg-risk-high/10',
    },
    {
      label: 'Trending Up',
      value: increasingCount,
      icon: Activity,
      color: 'text-risk-moderate',
      bg: 'bg-risk-moderate/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={cn(
            'p-4 rounded-xl border border-border bg-gradient-to-br from-card to-background',
            stat.pulse && 'pulse-critical'
          )}
        >
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded-lg', stat.bg)}>
              <stat.icon className={cn('w-5 h-5', stat.color)} />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
