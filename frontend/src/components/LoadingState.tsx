import React from 'react';
import { FileText, Globe, TestTube, Package, Shield } from 'lucide-react';

const LoadingState: React.FC = () => {
  const steps = [
    { icon: <FileText className="w-5 h-5" />, label: 'Analyzing README', delay: 0 },
    { icon: <Globe className="w-5 h-5" />, label: 'Generating OpenAPI', delay: 0.5 },
    { icon: <TestTube className="w-5 h-5" />, label: 'Creating Tests', delay: 1 },
    { icon: <Package className="w-5 h-5" />, label: 'Building Dockerfile', delay: 1.5 },
    { icon: <Shield className="w-5 h-5" />, label: 'Security Audit', delay: 2 },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-primary blur-3xl opacity-30 rounded-full animate-pulse"></div>
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-4 bg-gradient-primary rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground animate-pulse" />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground">
          Forging Your Artifacts
        </h2>
        <p className="text-muted-foreground">
          Our AI is analyzing your repository and generating comprehensive artifacts...
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-border/30 transition-all duration-500"
            style={{
              animationDelay: `${step.delay}s`,
              animation: `fadeInUp 0.6s ease-out ${step.delay}s both`
            }}
          >
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground">
              {step.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{step.label}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface/30 border border-border/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">Processing Status</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Repository Analysis</span>
            <span className="text-success font-medium">Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-gradient-primary h-2 rounded-full w-3/4 transition-all duration-1000 ease-out"></div>
          </div>
          <p className="text-xs text-muted-foreground">
            Estimated time remaining: 15-30 seconds
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;