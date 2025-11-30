import { useState, useMemo } from 'react';
import { mockPatients } from '@/data/mockPatients';
import { Patient, getRiskLevel } from '@/types/patient';
import { Header } from './Header';
import { StatsOverview } from './StatsOverview';
import { PatientCard } from './PatientCard';
import { PatientDetail } from './PatientDetail';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SortDesc, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortOption = 'risk-desc' | 'risk-asc' | 'name' | 'bed';

export const Dashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('risk-desc');
  const [filterRisk, setFilterRisk] = useState<string>('all');

  const filteredAndSortedPatients = useMemo(() => {
    let result = [...mockPatients];
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.bed.toLowerCase().includes(query) ||
        p.diagnosis.toLowerCase().includes(query)
      );
    }
    
    // Filter by risk level
    if (filterRisk !== 'all') {
      result = result.filter(p => getRiskLevel(p.sepsisRiskScore) === filterRisk);
    }
    
    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'risk-desc':
          return b.sepsisRiskScore - a.sepsisRiskScore;
        case 'risk-asc':
          return a.sepsisRiskScore - b.sepsisRiskScore;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'bed':
          return a.bed.localeCompare(b.bed);
        default:
          return 0;
      }
    });
    
    return result;
  }, [searchQuery, sortBy, filterRisk]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 lg:p-6">
        <StatsOverview patients={mockPatients} />
        
        <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-240px)]">
          {/* Patient List */}
          <div className="w-full lg:w-[400px] xl:w-[480px] flex flex-col">
            {/* Search and Filters */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients, beds, diagnoses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="flex-1 bg-secondary border-border">
                    <SortDesc className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="risk-desc">Risk (High → Low)</SelectItem>
                    <SelectItem value="risk-asc">Risk (Low → High)</SelectItem>
                    <SelectItem value="name">Name (A → Z)</SelectItem>
                    <SelectItem value="bed">Bed Number</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterRisk} onValueChange={setFilterRisk}>
                  <SelectTrigger className="flex-1 bg-secondary border-border">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    <SelectItem value="critical">Critical Only</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                    <SelectItem value="moderate">Moderate Risk</SelectItem>
                    <SelectItem value="low">Low Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Patient List */}
            <ScrollArea className="flex-1 pr-2">
              <div className="space-y-3">
                {filteredAndSortedPatients.map((patient) => (
                  <PatientCard
                    key={patient.id}
                    patient={patient}
                    onClick={() => setSelectedPatient(patient)}
                    isSelected={selectedPatient?.id === patient.id}
                  />
                ))}
                {filteredAndSortedPatients.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No patients match your search criteria
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
          
          {/* Patient Detail */}
          <div className="flex-1 min-w-0">
            {selectedPatient ? (
              <PatientDetail 
                patient={selectedPatient} 
                onClose={() => setSelectedPatient(null)}
              />
            ) : (
              <div className="h-full flex items-center justify-center rounded-xl border border-dashed border-border bg-card/50">
                <div className="text-center px-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Select a Patient</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Choose a patient from the list to view their detailed risk assessment and management plan
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
