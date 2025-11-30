import { AlertTriangle } from 'lucide-react';

interface ContributingFactorsProps {
  factors: string[];
}

export const ContributingFactors = ({ factors }: ContributingFactorsProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-risk-high" />
        Top Contributing Factors
      </h3>
      <div className="space-y-2">
        {factors.map((factor, idx) => (
          <div 
            key={idx}
            className="flex items-center gap-3 p-3 rounded-lg bg-risk-high/10 border border-risk-high/20 slide-in"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-risk-high/20 text-risk-high font-mono text-sm font-bold">
              {idx + 1}
            </div>
            <p className="text-sm text-foreground">{factor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
