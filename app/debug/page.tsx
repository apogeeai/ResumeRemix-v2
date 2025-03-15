'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface DebugInfo {
  status: string;
  timestamp: string;
  environment: {
    hasOpenAIKey: boolean;
    openAIKeyLength: number;
    nodeEnv: string;
    vercel?: boolean;
    environment?: string;
  };
  openAITest: string;
}

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generateTestError, setGenerateTestError] = useState<string | null>(null);

  const fetchDebugInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/debug');
      const data = await response.json();
      setDebugInfo(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testGenerate = async () => {
    setGenerateTestError(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: 'Test resume',
          jobDescription: 'Test job description',
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Generation test failed');
      }
      setGenerateTestError('Generation test successful');
    } catch (err: any) {
      setGenerateTestError(`Generation test error: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchDebugInfo();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Debug Information</h1>
      
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Status</h2>
          <div className="space-y-4">
            <Button 
              onClick={fetchDebugInfo} 
              disabled={loading}
              className="mr-4"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                'Refresh Debug Info'
              )}
            </Button>
            
            <Button 
              onClick={testGenerate}
              variant="outline"
            >
              Test Generate Endpoint
            </Button>

            {error && (
              <div className="text-red-500 mt-4">
                Error: {error}
              </div>
            )}

            {generateTestError && (
              <div className={`mt-4 ${generateTestError.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
                {generateTestError}
              </div>
            )}

            {debugInfo && (
              <div className="mt-4 space-y-2">
                <div><strong>Status:</strong> {debugInfo.status}</div>
                <div><strong>Timestamp:</strong> {debugInfo.timestamp}</div>
                <div><strong>OpenAI API Key Present:</strong> {debugInfo.environment.hasOpenAIKey ? 'Yes' : 'No'}</div>
                <div><strong>OpenAI API Key Length:</strong> {debugInfo.environment.openAIKeyLength}</div>
                <div><strong>Node Environment:</strong> {debugInfo.environment.nodeEnv}</div>
                <div><strong>Vercel:</strong> {debugInfo.environment.vercel ? 'Yes' : 'No'}</div>
                <div><strong>Environment:</strong> {debugInfo.environment.environment || 'Not set'}</div>
                <div><strong>OpenAI Test:</strong> {debugInfo.openAITest}</div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Request Information</h2>
          <div className="space-y-2">
            <div><strong>API Base URL:</strong> {window.location.origin}</div>
            <div><strong>Generate Endpoint:</strong> {`${window.location.origin}/api/generate`}</div>
          </div>
        </Card>
      </div>
    </div>
  );
} 