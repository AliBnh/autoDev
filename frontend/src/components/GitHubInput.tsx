import React, { useState } from 'react';
import { Github, ExternalLink, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface GitHubInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const GitHubInput: React.FC<GitHubInputProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const validateGitHubUrl = (url: string): boolean => {
    const githubRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;
    return githubRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    if (!validateGitHubUrl(url.trim())) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo)');
      return;
    }

    setError('');
    onAnalyze(url.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  const exampleUrls = [
    'https://github.com/facebook/react',
    'https://github.com/microsoft/vscode',
    'https://github.com/vercel/next.js'
  ];

  const handleExampleClick = (exampleUrl: string) => {
    setUrl(exampleUrl);
    setError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-primary blur-2xl opacity-20 rounded-full"></div>
            <Github className="w-16 h-16 text-primary relative z-10" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Artifact Forge
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Transform any GitHub repository into comprehensive documentation, tests, and deployment configs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Github className="w-5 h-5 text-muted-foreground" />
          </div>
          <Input
            type="url"
            placeholder="https://github.com/username/repository"
            value={url}
            onChange={handleInputChange}
            className={`pl-10 h-12 text-base rounded-xl border-2 transition-all duration-200 ${
              error 
                ? 'border-destructive focus:border-destructive' 
                : 'border-border focus:border-primary hover:border-primary/50'
            }`}
            disabled={isLoading}
          />
          {url && validateGitHubUrl(url) && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-y-0 right-16 flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full"
          disabled={isLoading || !url.trim()}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              Analyzing Repository...
            </>
          ) : (
            <>
              <Github className="w-5 h-5" />
              Analyze Repository
            </>
          )}
        </Button>
      </form>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          Try these examples:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {exampleUrls.map((exampleUrl, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleExampleClick(exampleUrl)}
              disabled={isLoading}
              className="text-xs"
            >
              {exampleUrl.split('/').slice(-2).join('/')}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubInput;