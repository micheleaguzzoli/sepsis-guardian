import { LabResults } from '@/types/patient';
import { cn } from '@/lib/utils';
import { TestTube } from 'lucide-react';

interface LabsPanelProps {
  labs: LabResults;
}

interface LabItemProps {
  label: string;
  value: number;
  unit: string;
  normalRange: string;
  isAbnormal: boolean;
}

const LabItem = ({ label, value, unit, normalRange, isAbnormal }: LabItemProps) => (
  <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
    <div>
      <p className="text-sm text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">Normal: {normalRange}</p>
    </div>
    <div className="text-right">
      <p className={cn(
        'font-mono font-semibold',
        isAbnormal ? 'text-destructive' : 'text-foreground'
      )}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{unit}</p>
    </div>
  </div>
);

export const LabsPanel = ({ labs }: LabsPanelProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <TestTube className="w-4 h-4 text-primary" />
        Laboratory Results
      </h3>
      <div className="bg-secondary/30 rounded-lg p-3">
        <LabItem 
          label="Lactate"
          value={labs.lactate}
          unit="mmol/L"
          normalRange="0.5-2.0"
          isAbnormal={labs.lactate > 2}
        />
        <LabItem 
          label="Creatinine"
          value={labs.creatinine}
          unit="mg/dL"
          normalRange="0.7-1.3"
          isAbnormal={labs.creatinine > 1.3}
        />
        <LabItem 
          label="Bilirubin"
          value={labs.bilirubin}
          unit="mg/dL"
          normalRange="0.1-1.2"
          isAbnormal={labs.bilirubin > 1.2}
        />
        <LabItem 
          label="Platelets"
          value={labs.platelets}
          unit="K/μL"
          normalRange="150-400"
          isAbnormal={labs.platelets < 150}
        />
        <LabItem 
          label="WBC"
          value={labs.wbc}
          unit="K/μL"
          normalRange="4.5-11.0"
          isAbnormal={labs.wbc > 11 || labs.wbc < 4.5}
        />
        <LabItem 
          label="P/F Ratio"
          value={labs.pf_ratio}
          unit=""
          normalRange=">300"
          isAbnormal={labs.pf_ratio < 300}
        />
      </div>
    </div>
  );
};
