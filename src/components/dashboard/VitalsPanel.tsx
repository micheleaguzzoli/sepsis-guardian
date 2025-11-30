import { Vitals } from '@/types/patient';
import { cn } from '@/lib/utils';
import { Heart, Activity, Wind, Thermometer, Droplets } from 'lucide-react';

interface VitalsPanelProps {
  vitals: Vitals;
}

interface VitalItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  unit: string;
  isAbnormal?: boolean;
  color: string;
}

const VitalItem = ({ icon: Icon, label, value, unit, isAbnormal, color }: VitalItemProps) => (
  <div className={cn(
    'p-3 rounded-lg border transition-all',
    isAbnormal 
      ? 'bg-destructive/10 border-destructive/30' 
      : 'bg-secondary/50 border-border'
  )}>
    <div className="flex items-center gap-2 mb-1">
      <Icon className={cn('w-4 h-4', color)} />
      <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
    <div className="flex items-baseline gap-1">
      <span className={cn(
        'text-xl font-mono font-semibold',
        isAbnormal ? 'text-destructive' : 'text-foreground'
      )}>
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{unit}</span>
    </div>
  </div>
);

export const VitalsPanel = ({ vitals }: VitalsPanelProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <Activity className="w-4 h-4 text-primary" />
        Current Vitals
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        <VitalItem 
          icon={Heart}
          label="Heart Rate"
          value={vitals.heartRate}
          unit="bpm"
          isAbnormal={vitals.heartRate > 100 || vitals.heartRate < 60}
          color="text-organ-cardiac"
        />
        <VitalItem 
          icon={Activity}
          label="MAP"
          value={vitals.map}
          unit="mmHg"
          isAbnormal={vitals.map < 65}
          color="text-primary"
        />
        <VitalItem 
          icon={Activity}
          label="BP"
          value={`${vitals.systolicBP}/${vitals.diastolicBP}`}
          unit="mmHg"
          isAbnormal={vitals.systolicBP < 90}
          color="text-primary"
        />
        <VitalItem 
          icon={Wind}
          label="Resp Rate"
          value={vitals.respiratoryRate}
          unit="/min"
          isAbnormal={vitals.respiratoryRate > 22}
          color="text-organ-lung"
        />
        <VitalItem 
          icon={Droplets}
          label="SpO2"
          value={vitals.spO2}
          unit="%"
          isAbnormal={vitals.spO2 < 94}
          color="text-organ-lung"
        />
        <VitalItem 
          icon={Thermometer}
          label="Temp"
          value={vitals.temperature.toFixed(1)}
          unit="°C"
          isAbnormal={vitals.temperature > 38 || vitals.temperature < 36}
          color="text-risk-high"
        />
      </div>
    </div>
  );
};
