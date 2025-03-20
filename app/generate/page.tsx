import { SparklesCore } from "@/components/ui/sparkles";
import GeneratorClient from './page.client';

export default function GeneratePage() {
  return (
    <div className="min-h-screen relative">
      {/* Particles Background */}
      <div className="fixed inset-0 w-full h-full opacity-50">
        <SparklesCore
          background="transparent"
          minSize={0.2}
          maxSize={0.8}
          particleDensity={800}
          className="w-full h-full"
          particleColor="#FFFFFF"
          speed={0.5}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <GeneratorClient />
      </div>
    </div>
  );
} 