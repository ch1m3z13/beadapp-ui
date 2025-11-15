'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ProjectCard, { type Project } from './ProjectCard';
import ProjectsToolbar from './ProjectsToolbar';
import EmptyProjectsState from './EmptyProjectsState';
import BottomTabNavigation from '@/components/common/BottomTabNavigation';
import FloatingActionButton from '@/components/common/FloatingActionButton';

interface ProjectsListInteractiveProps {
  initialProjects: Project[];
}

const ProjectsListInteractive = ({ initialProjects }: ProjectsListInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [projects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status/platform filter
    if (selectedFilter !== 'all') {
      if (['active', 'paused', 'error', 'idle'].includes(selectedFilter)) {
        filtered = filtered.filter(project => project.status === selectedFilter);
      } else if (['x', 'farcaster'].includes(selectedFilter)) {
        filtered = filtered.filter(project => project.platform === selectedFilter);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'insights':
          return b.totalInsights - a.totalInsights;
        case 'recent':
        default:
          return new Date(b.lastScraped).getTime() - new Date(a.lastScraped).getTime();
      }
    });

    return filtered;
  }, [projects, searchQuery, selectedFilter, sortBy]);

  const handleSelectProject = (projectId: string) => {
    setSelectedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProjects.length === filteredAndSortedProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredAndSortedProjects.map(p => p.id));
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on projects:`, selectedProjects);
    // In real app, this would make API calls
    setSelectedProjects([]);
  };

  const handleToggleStatus = (projectId: string) => {
    console.log(`Toggle status for project: ${projectId}`);
    // In real app, this would update project status
  };

  const handleOpenSettings = (projectId: string) => {
    console.log(`Open settings for project: ${projectId}`);
    // In real app, this would open project settings modal
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedFilter('all');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="h-16 bg-muted"></div>
          <div className="p-4 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const hasSearchQuery = searchQuery.trim().length > 0 || selectedFilter !== 'all';
  const showEmptyState = filteredAndSortedProjects.length === 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Projects</h1>
            <p className="text-sm text-muted-foreground">
              {projects.length} project{projects.length !== 1 ? 's' : ''} total
            </p>
          </div>
          
          {filteredAndSortedProjects.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              {selectedProjects.length === filteredAndSortedProjects.length ? 'Deselect All' : 'Select All'}
            </button>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <ProjectsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedCount={selectedProjects.length}
        onBulkAction={handleBulkAction}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />

      {/* Content */}
      <div className="p-4">
        {showEmptyState ? (
          <EmptyProjectsState
            hasSearchQuery={hasSearchQuery}
            searchQuery={searchQuery}
            onClearSearch={handleClearSearch}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAndSortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isSelected={selectedProjects.includes(project.id)}
                onSelect={handleSelectProject}
                onToggleStatus={handleToggleStatus}
                onOpenSettings={handleOpenSettings}
              />
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <BottomTabNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default ProjectsListInteractive;