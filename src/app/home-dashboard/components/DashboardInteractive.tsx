'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PostCard from './PostCard';
import FilterControls from './FilterControls';
import PostSkeleton from './PostSkeleton';
import EmptyState from './EmptyState';
import ToastNotification from './ToastNotification';
import BottomTabNavigation from '@/components/common/BottomTabNavigation';
import FloatingActionButton from '@/components/common/FloatingActionButton';

interface Post {
  id: string;
  content: string;
  projectName: string;
  projectImage: string;
  projectImageAlt: string;
  timestamp: string;
  likes: number;
  shares: number;
  status: 'pending' | 'approved' | 'rejected';
  platform: 'X' | 'Farcaster';
  projectId: string;
}

interface Project {
  id: string;
  name: string;
}

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
}

const DashboardInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [toast, setToast] = useState<Toast>({ message: '', type: 'info', isVisible: false });

  // Mock data
  const mockProjects: Project[] = [
  { id: '1', name: 'TechStartup X' },
  { id: '2', name: 'CryptoDAO' },
  { id: '3', name: 'NFT Collection' },
  { id: '4', name: 'DeFi Protocol' }];


  const mockPosts: Post[] = [
  {
    id: '1',
    content: "🚀 Just shipped our latest feature! The community response has been incredible. Sometimes the best innovations come from listening to your users. What's your take on user-driven development? #TechStartup #Innovation",
    projectName: 'TechStartup X',
    projectImage: "https://images.unsplash.com/photo-1667391551176-9070c1dc52e0",
    projectImageAlt: 'Modern tech startup office with glass walls and collaborative workspace',
    timestamp: '2 hours ago',
    likes: 42,
    shares: 8,
    status: 'pending',
    platform: 'X',
    projectId: '1'
  },
  {
    id: '2',
    content: "💎 The future of decentralized governance is here! Our latest proposal just passed with 89% community approval. Democracy in action, powered by blockchain. Who says crypto can't be inclusive? 🗳️ #DAO #Crypto",
    projectName: 'CryptoDAO',
    projectImage: "https://images.unsplash.com/photo-1667808931689-00d08946d9c7",
    projectImageAlt: 'Digital cryptocurrency coins and blockchain network visualization on dark background',
    timestamp: '4 hours ago',
    likes: 156,
    shares: 23,
    status: 'approved',
    platform: 'Farcaster',
    projectId: '2'
  },
  {
    id: '3',
    content: "🎨 Art meets technology in ways we never imagined. Our latest NFT drop sold out in 3 minutes! The intersection of creativity and blockchain continues to amaze us. What's your favorite NFT project? #NFT #DigitalArt",
    projectName: 'NFT Collection',
    projectImage: "https://images.unsplash.com/photo-1514480528757-fabb827ff382",
    projectImageAlt: 'Colorful digital art NFT collection display with geometric patterns and vibrant colors',
    timestamp: '6 hours ago',
    likes: 89,
    shares: 15,
    status: 'approved',
    platform: 'X',
    projectId: '3'
  },
  {
    id: '4',
    content: "⚡ DeFi just got faster! Our new protocol reduces transaction costs by 70% while maintaining security. Sometimes the best solutions are the simplest ones. Ready to experience lightning-fast DeFi? #DeFi #Blockchain",
    projectName: 'DeFi Protocol',
    projectImage: "https://images.unsplash.com/photo-1659018966825-43297e655ccf",
    projectImageAlt: 'Futuristic DeFi protocol interface with financial charts and blockchain connections',
    timestamp: '8 hours ago',
    likes: 234,
    shares: 45,
    status: 'rejected',
    platform: 'Farcaster',
    projectId: '4'
  },
  {
    id: '5',
    content: "🌟 Building in public has its challenges, but the community support makes it all worth it. Every bug report, every feature request, every word of encouragement - it all matters. Thank you for being part of this journey! 🙏",
    projectName: 'TechStartup X',
    projectImage: "https://images.unsplash.com/photo-1667391551176-9070c1dc52e0",
    projectImageAlt: 'Modern tech startup office with glass walls and collaborative workspace',
    timestamp: '12 hours ago',
    likes: 67,
    shares: 12,
    status: 'pending',
    platform: 'X',
    projectId: '1'
  }];


  useEffect(() => {
    setIsHydrated(true);
    // Simulate loading
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort posts
  useEffect(() => {
    if (!isHydrated) return;

    let filtered = [...posts];

    // Filter by project
    if (selectedProject !== 'all') {
      filtered = filtered.filter((post) => post.projectId === selectedProject);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((post) => post.status === selectedStatus);
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'most-liked':
          return b.likes - a.likes;
        case 'most-shared':
          return b.shares - a.shares;
        case 'newest':
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

    setFilteredPosts(filtered);
  }, [posts, selectedProject, selectedStatus, sortBy, isHydrated]);

  const showToast = useCallback((message: string, type: Toast['type']) => {
    setToast({ message, type, isVisible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  const handleLike = useCallback((postId: string) => {
    setPosts((prev) => prev.map((post) =>
    post.id === postId ?
    { ...post, likes: post.likes + 1 } :
    post
    ));
    showToast('Post liked!', 'success');
  }, [showToast]);

  const handleShare = useCallback((postId: string) => {
    setPosts((prev) => prev.map((post) =>
    post.id === postId ?
    { ...post, shares: post.shares + 1 } :
    post
    ));
    showToast('Post shared successfully!', 'success');
  }, [showToast]);

  const handleApprove = useCallback((postId: string) => {
    setPosts((prev) => prev.map((post) =>
    post.id === postId ?
    { ...post, status: 'approved' as const } :
    post
    ));
    showToast('Post approved for publishing!', 'success');
  }, [showToast]);

  const handleReject = useCallback((postId: string) => {
    setPosts((prev) => prev.map((post) =>
    post.id === postId ?
    { ...post, status: 'rejected' as const } :
    post
    ));
    showToast('Post rejected', 'warning');
  }, [showToast]);

  const handleRegenerate = useCallback((postId: string) => {
    showToast('Regenerating post with AI...', 'info');
    // Simulate regeneration
    setTimeout(() => {
      showToast('New post generated successfully!', 'success');
    }, 2000);
  }, [showToast]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 pb-20">
          <div className="space-y-6">
            {[...Array(3)].map((_, i) =>
            <PostSkeleton key={i} />
            )}
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 pb-20">
        <FilterControls
          selectedProject={selectedProject}
          selectedStatus={selectedStatus}
          sortBy={sortBy}
          onProjectChange={setSelectedProject}
          onStatusChange={setSelectedStatus}
          onSortChange={setSortBy}
          projects={mockProjects} />


        {isLoading ?
        <div className="space-y-6">
            {[...Array(3)].map((_, i) =>
          <PostSkeleton key={i} />
          )}
          </div> :
        filteredPosts.length === 0 ?
        <EmptyState /> :

        <div className="space-y-6">
            {filteredPosts.map((post) =>
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onShare={handleShare}
            onApprove={handleApprove}
            onReject={handleReject}
            onRegenerate={handleRegenerate} />

          )}
          </div>
        }
      </div>

      <FloatingActionButton />
      <BottomTabNavigation />
      
      <ToastNotification
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast} />

    </div>);

};

export default DashboardInteractive;