'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProjectHeader from './ProjectHeader';
import TabNavigation from './TabNavigation';
import InsightsTab from './InsightsTab';
import GeneratedPostsTab from './GeneratedPostsTab';
import ScheduleTab from './ScheduleTab';
import BottomTabNavigation from '@/components/common/BottomTabNavigation';
import FloatingActionButton from '@/components/common/FloatingActionButton';

interface ProjectDetailInteractiveProps {
  projectId?: string;
}

const ProjectDetailInteractive = ({ projectId = '1' }: ProjectDetailInteractiveProps) => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState('insights');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Mock project data
  const mockProject = {
    id: projectId,
    name: "DeFi Protocol X",
    sourceUrl: "https://x.com/defiprotocolx",
    platform: 'x' as const,
    tags: ["DeFi", "Blockchain", "Web3"],
    lastUpdate: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1692776481769-8f95560f1b52",
    isScrapingActive: true
  };

  // Mock insights data
  const mockInsights = [
  {
    id: '1',
    date: 'Nov 15, 2025 - 10:30 AM',
    source: 'X Post',
    sourceUrl: 'https://x.com/defiprotocolx/status/123',
    title: 'Major Protocol Update Released',
    content: 'We are excited to announce the release of our latest protocol update featuring enhanced security measures, improved gas efficiency, and new staking rewards. This update represents months of development and testing to ensure the best user experience.',
    type: 'announcement' as const,
    engagement: {
      likes: 245,
      shares: 89,
      comments: 34
    }
  },
  {
    id: '2',
    date: 'Nov 14, 2025 - 3:15 PM',
    source: 'X Post',
    sourceUrl: 'https://x.com/defiprotocolx/status/124',
    title: 'Community Milestone Reached',
    content: 'Incredible news! We have officially reached 100,000 active users on our platform. Thank you to our amazing community for your continued support and trust in our protocol.',
    type: 'milestone' as const,
    engagement: {
      likes: 892,
      shares: 234,
      comments: 156
    }
  },
  {
    id: '3',
    date: 'Nov 13, 2025 - 8:45 AM',
    source: 'X Post',
    sourceUrl: 'https://x.com/defiprotocolx/status/125',
    title: 'Technical Discussion on Scalability',
    content: 'Join our technical discussion about Layer 2 scaling solutions and how they will impact the future of DeFi. Our engineering team will be hosting an AMA session next week to answer your questions.',
    type: 'discussion' as const,
    engagement: {
      likes: 167,
      shares: 45,
      comments: 78
    }
  }];


  // Mock generated posts data
  const mockGeneratedPosts = [
  {
    id: '1',
    content: '🚀 Big things are happening at DeFi Protocol X! Our latest update brings enhanced security and improved gas efficiency. The future of DeFi is looking brighter than ever! #DeFi #Blockchain #Web3',
    status: 'pending' as const,
    createdAt: '2 hours ago',
    platform: 'x' as const
  },
  {
    id: '2',
    content: '🎉 100K users and counting! Thank you to our incredible community for making DeFi Protocol X a success. Together, we are building the future of decentralized finance! 💪 #Community #DeFi',
    status: 'approved' as const,
    createdAt: '1 day ago',
    scheduledFor: 'Nov 16, 2025 at 2:00 PM',
    platform: 'x' as const,
    engagement: {
      likes: 156,
      shares: 43,
      comments: 28
    }
  },
  {
    id: '3',
    content: '🔧 Technical deep dive alert! Join us next week for an AMA about Layer 2 scaling solutions. Our engineers are ready to answer all your questions about the future of DeFi scalability! #TechTalk #Layer2',
    status: 'scheduled' as const,
    createdAt: '2 days ago',
    scheduledFor: 'Nov 17, 2025 at 10:00 AM',
    platform: 'x' as const
  }];


  // Mock scheduled posts data
  const mockScheduledPosts = [
  {
    id: '2',
    content: '🎉 100K users and counting! Thank you to our incredible community for making DeFi Protocol X a success. Together, we are building the future of decentralized finance! 💪 #Community #DeFi',
    scheduledFor: '2025-11-16T14:00:00Z',
    platform: 'x' as const,
    status: 'scheduled' as const
  },
  {
    id: '3',
    content: '🔧 Technical deep dive alert! Join us next week for an AMA about Layer 2 scaling solutions. Our engineers are ready to answer all your questions about the future of DeFi scalability! #TechTalk #Layer2',
    scheduledFor: '2025-11-17T10:00:00Z',
    platform: 'x' as const,
    status: 'scheduled' as const
  }];


  const tabs = [
  {
    id: 'insights',
    label: 'Insights',
    icon: 'DocumentTextIcon',
    count: mockInsights.length
  },
  {
    id: 'posts',
    label: 'Generated Posts',
    icon: 'PencilSquareIcon',
    count: mockGeneratedPosts.length
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: 'CalendarIcon',
    count: mockScheduledPosts.length
  }];


  const handlePostApprove = (postId: string) => {
    if (!isHydrated) return;
    console.log('Approving post:', postId);
  };

  const handlePostReject = (postId: string) => {
    if (!isHydrated) return;
    console.log('Rejecting post:', postId);
  };

  const handlePostRegenerate = (postId: string) => {
    if (!isHydrated) return;
    console.log('Regenerating post:', postId);
  };

  const handlePostEdit = (postId: string) => {
    if (!isHydrated) return;
    console.log('Editing post:', postId);
  };

  const handleReschedule = (postId: string, newDate: string) => {
    if (!isHydrated) return;
    console.log('Rescheduling post:', postId, 'to:', newDate);
  };

  const handleCancelSchedule = (postId: string) => {
    if (!isHydrated) return;
    console.log('Cancelling scheduled post:', postId);
  };

  const handleTabChange = (tab: string) => {
    if (!isHydrated) return;
    setActiveTab(tab);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          <div className="bg-card border-b border-border p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-muted rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="flex gap-2">
                  <div className="h-6 bg-muted rounded w-16" />
                  <div className="h-6 bg-muted rounded w-16" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-card border-b border-border">
            <div className="flex">
              {[1, 2, 3].map((i) =>
              <div key={i} className="flex-1 p-4">
                  <div className="h-4 bg-muted rounded w-20 mx-auto" />
                </div>
              )}
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) =>
            <div key={i} className="bg-card border border-border rounded-lg p-4">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-full mb-1" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            )}
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <ProjectHeader project={mockProject} />
      
      <TabNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={tabs} />

      
      <div className="min-h-96">
        {activeTab === 'insights' &&
        <InsightsTab insights={mockInsights} />
        }
        
        {activeTab === 'posts' &&
        <GeneratedPostsTab
          posts={mockGeneratedPosts}
          onApprove={handlePostApprove}
          onReject={handlePostReject}
          onRegenerate={handlePostRegenerate}
          onEdit={handlePostEdit} />

        }
        
        {activeTab === 'schedule' &&
        <ScheduleTab
          scheduledPosts={mockScheduledPosts}
          onReschedule={handleReschedule}
          onCancel={handleCancelSchedule} />

        }
      </div>
      
      <BottomTabNavigation />
      <FloatingActionButton />
    </div>);

};

export default ProjectDetailInteractive;