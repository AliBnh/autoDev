import React, { useState } from 'react';
import GitHubInput from '@/components/GitHubInput';
import LoadingState from '@/components/LoadingState';
import ResultsView from '@/components/ResultsView';
import { generateMockArtifacts } from '@/data/mockArtifacts';

type AppState = 'input' | 'loading' | 'results';

const Index = () => {
  const [state, setState] = useState<AppState>('input');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [artifacts, setArtifacts] = useState<any[]>([]);

  const handleAnalyze = async (url: string) => {
    setRepositoryUrl(url);
    setState('loading');
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      const mockArtifacts = generateMockArtifacts(url);
      setArtifacts(mockArtifacts);
      setState('results');
    }, 3000);
  };

  const handleStartOver = () => {
    setState('input');
    setRepositoryUrl('');
    setArtifacts([]);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-4 py-8">
        {state === 'input' && (
          <div className="flex items-center justify-center min-h-screen">
            <GitHubInput onAnalyze={handleAnalyze} isLoading={false} />
          </div>
        )}
        
        {state === 'loading' && (
          <div className="flex items-center justify-center min-h-screen">
            <LoadingState />
          </div>
        )}
        
        {state === 'results' && (
          <div className="py-8">
            <ResultsView
              repositoryUrl={repositoryUrl}
              artifacts={artifacts}
              onStartOver={handleStartOver}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
