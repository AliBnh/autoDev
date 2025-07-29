import React, { useState } from 'react';
import { FileText, Globe, TestTube, Package, Shield, ChevronDown, ChevronUp, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import CodeBlock from './CodeBlock';

interface GeneratedArtifact {
  type: 'readme' | 'openapi' | 'tests' | 'dockerfile' | 'audit';
  title: string;
  filename: string;
  language: string;
  content: string;
  icon: React.ReactNode;
}

interface ResultsViewProps {
  repositoryUrl: string;
  artifacts: GeneratedArtifact[];
  onStartOver: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ repositoryUrl, artifacts, onStartOver }) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['readme']));
  const { toast } = useToast();

  const toggleSection = (type: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(type)) {
      newOpenSections.delete(type);
    } else {
      newOpenSections.add(type);
    }
    setOpenSections(newOpenSections);
  };

  const downloadAll = () => {
    artifacts.forEach(artifact => {
      const blob = new Blob([artifact.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = artifact.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    toast({
      title: "Download started",
      description: "All artifacts are being downloaded.",
      duration: 3000,
    });
  };

  const repoName = repositoryUrl.split('/').slice(-2).join('/');

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Artifacts Generated</h1>
            <p className="text-muted-foreground">
              for <span className="font-mono text-primary">{repoName}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={onStartOver}>
            <RotateCcw className="w-4 h-4" />
            Analyze Another Repository
          </Button>
          <Button variant="default" onClick={downloadAll}>
            <Download className="w-4 h-4" />
            Download All Files
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {artifacts.map((artifact, index) => (
          <div
            key={artifact.type}
            className="bg-surface/50 border border-border/30 rounded-xl p-4 text-center hover:bg-surface/70 transition-colors cursor-pointer"
            onClick={() => toggleSection(artifact.type)}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg mx-auto mb-2">
              {artifact.icon}
            </div>
            <p className="font-medium text-sm text-foreground">{artifact.title}</p>
            <p className="text-xs text-muted-foreground">{artifact.filename}</p>
          </div>
        ))}
      </div>

      {/* Generated Artifacts */}
      <div className="space-y-6">
        {artifacts.map((artifact) => (
          <Collapsible
            key={artifact.type}
            open={openSections.has(artifact.type)}
            onOpenChange={() => toggleSection(artifact.type)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between h-auto p-6 bg-surface/30 border border-border/30 rounded-xl hover:bg-surface/50 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground">
                    {artifact.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg text-foreground">{artifact.title}</h3>
                    <p className="text-sm text-muted-foreground">{artifact.filename}</p>
                  </div>
                </div>
                {openSections.has(artifact.type) ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="pt-6">
              <CodeBlock
                title={artifact.title}
                language={artifact.language}
                code={artifact.content}
                filename={artifact.filename}
                icon={artifact.icon}
              />
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-border/30">
        <p className="text-sm text-muted-foreground">
          Generated with ❤️ by Artifact Forge • Ready to deploy and ship
        </p>
      </div>
    </div>
  );
};

export default ResultsView;