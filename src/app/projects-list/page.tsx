import type { Metadata } from 'next';
import ProjectsListInteractive from './components/ProjectsListInteractive';
import { type Project } from './components/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects List - BeadApp',
  description: 'Manage and track all your social media projects from X and Farcaster platforms with real-time scraping and AI-powered content generation.'
};

export default function ProjectsListPage() {
  const mockProjects: Project[] = [
  {
    id: '1',
    name: 'TechStartup Weekly',
    platform: 'x',
    status: 'active',
    lastScraped: '2025-11-15T02:45:00Z',
    totalInsights: 127,
    postsGenerated: 23,
    avatar: "https://images.unsplash.com/photo-1673368666897-ca0c04795169",
    url: 'https://x.com/techstartup_weekly',
    tags: ['tech', 'startup', 'innovation'],
    createdAt: '2025-11-10T10:00:00Z'
  },
  {
    id: '2',
    name: 'Crypto Insights Hub',
    platform: 'farcaster',
    status: 'active',
    lastScraped: '2025-11-15T01:30:00Z',
    totalInsights: 89,
    postsGenerated: 15,
    avatar: "https://images.unsplash.com/photo-1639762679376-e8fce0880dfb",
    url: 'https://warpcast.com/crypto-insights',
    tags: ['crypto', 'blockchain', 'defi'],
    createdAt: '2025-11-08T14:30:00Z'
  },
  {
    id: '3',
    name: 'AI Research Daily',
    platform: 'x',
    status: 'paused',
    lastScraped: '2025-11-14T18:20:00Z',
    totalInsights: 203,
    postsGenerated: 41,
    avatar: "https://images.unsplash.com/photo-1692776481769-8f95560f1b52",
    url: 'https://x.com/ai_research_daily',
    tags: ['ai', 'research', 'machine-learning'],
    createdAt: '2025-11-05T09:15:00Z'
  },
  {
    id: '4',
    name: 'Web3 Community',
    platform: 'farcaster',
    status: 'error',
    lastScraped: '2025-11-14T12:00:00Z',
    totalInsights: 45,
    postsGenerated: 8,
    avatar: "https://images.unsplash.com/photo-1676907820154-00c32157f647",
    url: 'https://warpcast.com/web3-community',
    tags: ['web3', 'community', 'nft'],
    createdAt: '2025-11-12T16:45:00Z'
  },
  {
    id: '5',
    name: 'Design Inspiration',
    platform: 'x',
    status: 'active',
    lastScraped: '2025-11-15T03:00:00Z',
    totalInsights: 156,
    postsGenerated: 28,
    avatar: "https://images.unsplash.com/photo-1668031772591-435d47be5f75",
    url: 'https://x.com/design_inspire',
    tags: ['design', 'ui', 'creativity'],
    createdAt: '2025-11-07T11:20:00Z'
  },
  {
    id: '6',
    name: 'Marketing Trends',
    platform: 'farcaster',
    status: 'idle',
    lastScraped: '2025-11-13T20:15:00Z',
    totalInsights: 78,
    postsGenerated: 12,
    avatar: "https://images.unsplash.com/photo-1587978480819-1ade64f79a42",
    url: 'https://warpcast.com/marketing-trends',
    tags: ['marketing', 'trends', 'social-media'],
    createdAt: '2025-11-09T13:10:00Z'
  }];


  return <ProjectsListInteractive initialProjects={mockProjects} />;
}