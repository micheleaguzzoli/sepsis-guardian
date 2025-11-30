import { Patient } from '@/types/patient';
import { RiskIndicator } from './RiskIndicator';
import { OrganRiskCard } from './OrganRiskCard';
import { VitalsPanel } from './VitalsPanel';
import { LabsPanel } from './LabsPanel';
import { ManagementPlanCard } from './ManagementPlanCard';
import { ContributingFactors } from './ContributingFactors';
import { Bed, Calendar, User, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PatientDetailProps {
  patient: Patient;
  onClose: () => void;
}

export const PatientDetail = ({ patient, onClose }: PatientDetailProps) => {
  return (
    <div className="h-full flex flex-col bg-card rounded-xl border border-border overflow-hidden fade-in">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-card to-background">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <RiskIndicator 
              score={patient.sepsisRiskScore} 
              size="xl"
              showLabel
              trend={patient.sepsisRiskTrend}
            />
            <div>
              <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">{patient.diagnosis}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {patient.age} y/o {patient.gender === 'M' ? 'Male' : 'Female'}
                </span>
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  {patient.bed}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Admitted {patient.admissionDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Last updated: {patient.lastUpdated.toLocaleTimeString()}</span>
          <span className="text-primary">• 6-hour prediction horizon</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Contributing Factors */}
          <ContributingFactors factors={patient.topContributingFactors} />
          
          {/* Organ Risks Grid */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Multi-Organ Risk Assessment</h3>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {patient.organRisks
                .sort((a, b) => b.riskScore - a.riskScore)
                .map((risk) => (
                  <OrganRiskCard key={risk.organ} risk={risk} />
                ))}
            </div>
          </div>
          
          {/* Vitals and Labs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <VitalsPanel vitals={patient.vitals} />
            <LabsPanel labs={patient.labs} />
          </div>
          
          {/* Management Plan */}
          <ManagementPlanCard plans={patient.managementPlan} />
        </div>
      </ScrollArea>
    </div>
  );
};
