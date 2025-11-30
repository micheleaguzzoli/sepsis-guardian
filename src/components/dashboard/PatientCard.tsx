import { Patient, getRiskLevel } from '@/types/patient';
import { cn } from '@/lib/utils';
import { RiskIndicator } from './RiskIndicator';
import { OrganRiskCard } from './OrganRiskCard';
import { TrendingUp, TrendingDown, Minus, Bed, Calendar, User } from 'lucide-react';

interface PatientCardProps {
  patient: Patient;
  onClick: () => void;
  isSelected: boolean;
}

export const PatientCard = ({ patient, onClick, isSelected }: PatientCardProps) => {
  const level = getRiskLevel(patient.sepsisRiskScore);
  
  const TrendIcon = patient.sepsisRiskTrend === 'increasing' 
    ? TrendingUp 
    : patient.sepsisRiskTrend === 'decreasing' 
    ? TrendingDown 
    : Minus;

  const trendColor = patient.sepsisRiskTrend === 'increasing' 
    ? 'text-risk-critical' 
    : patient.sepsisRiskTrend === 'decreasing' 
    ? 'text-risk-low' 
    : 'text-muted-foreground';

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-4 rounded-xl border cursor-pointer transition-all duration-300',
        'bg-gradient-to-b from-card to-background',
        isSelected 
          ? 'border-primary ring-1 ring-primary/50' 
          : 'border-border hover:border-primary/30',
        level === 'critical' && 'border-destructive/50 hover:border-destructive',
      )}
    >
      <div className="flex items-start gap-4">
        <RiskIndicator 
          score={patient.sepsisRiskScore} 
          size="lg"
          trend={patient.sepsisRiskTrend}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-foreground truncate">{patient.name}</h3>
            <div className={cn('flex items-center gap-1', trendColor)}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-xs capitalize">{patient.sepsisRiskTrend}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {patient.age}{patient.gender}
            </span>
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" />
              {patient.bed}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Day {Math.ceil((new Date().getTime() - patient.admissionDate.getTime()) / (1000 * 60 * 60 * 24))}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground truncate mb-3">{patient.diagnosis}</p>
          
          {/* Mini organ risks */}
          <div className="grid grid-cols-5 gap-1">
            {patient.organRisks.map((risk) => (
              <OrganRiskCard key={risk.organ} risk={risk} compact />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
