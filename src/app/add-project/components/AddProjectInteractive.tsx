'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import ProjectFormFields from './ProjectFormFields';
import ScrapingToggle from './ScrapingToggle';
import FormActions from './FormActions';
import LoadingSkeleton from './LoadingSkeleton';

interface FormData {
  name: string;
  platform: 'x' | 'farcaster' | '';
  url: string;
  tags: string;
  description: string;
}

const AddProjectInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    platform: '',
    url: '',
    tags: '',
    description: ''
  });
  const [immediateScraping, setImmediateScraping] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlError, setUrlError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validateUrl = (url: string, platform: string) => {
    if (!url || !platform) return '';

    const urlPatterns = {
      x: /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/\w+\/(status|post)\/\d+/,
      farcaster: /^https?:\/\/(www\.)?warpcast\.com\/\w+\/0x[a-fA-F0-9]+/
    };

    const pattern = urlPatterns[platform as keyof typeof urlPatterns];
    if (!pattern || !pattern.test(url)) {
      return `Please enter a valid ${platform === 'x' ? 'X' : 'Farcaster'} URL`;
    }

    return '';
  };

  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'url' || field === 'platform') {
      setIsValidating(true);
      setTimeout(() => {
        const error = validateUrl(
          field === 'url' ? value : formData.url,
          field === 'platform' ? value : formData.platform
        );
        setUrlError(error);
        setIsValidating(false);
      }, 500);
    }
  };

  const isFormValid = () => {
    return formData.name.trim() && 
           formData.platform && 
           formData.url.trim() && 
           !urlError;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock project creation
      const newProject = {
        id: Date.now(),
        name: formData.name,
        platform: formData.platform,
        url: formData.url,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        description: formData.description,
        createdAt: new Date().toISOString(),
        status: immediateScraping ? 'active' : 'idle',
        scrapingEnabled: immediateScraping
      };

      // Store in localStorage for demo
      const existingProjects = JSON.parse(localStorage.getItem('beadapp_projects') || '[]');
      existingProjects.push(newProject);
      localStorage.setItem('beadapp_projects', JSON.stringify(existingProjects));

      // Navigate to project detail
      router.push(`/project-detail?id=${newProject.id}`);
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-muted rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Go back"
          >
            <Icon name="ArrowLeftIcon" size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Add New Project</h1>
            <p className="text-muted-foreground">
              Configure a new social media project for automated tracking
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-subtle">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <ProjectFormFields
              formData={formData}
              onFormDataChange={handleFormDataChange}
              urlError={urlError}
              isValidating={isValidating}
            />

            <div className="mt-8">
              <ScrapingToggle
                enabled={immediateScraping}
                onToggle={setImmediateScraping}
                isProcessing={isSubmitting}
              />
            </div>

            <FormActions
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
              isValid={isFormValid()}
            />
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-start gap-3">
            <Icon 
              name="InformationCircleIcon" 
              size={20} 
              className="text-primary flex-shrink-0 mt-0.5"
            />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Getting Started</p>
              <p>
                After creating your project, BeadApp will automatically scrape updates and insights 
                from the source platform. You can monitor progress and view generated content in 
                the project detail screen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectInteractive;