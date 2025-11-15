import type { Metadata } from 'next';
import SettingsInteractive from './components/SettingsInteractive';

export const metadata: Metadata = {
  title: 'Settings - BeadApp',
  description: 'Manage your account preferences, API configurations, theme settings, and privacy options in BeadApp.'
};

interface UserData {
  name: string;
  email: string;
  profileImage: string;
  profileImageAlt: string;
}

interface ApiKey {
  id: string;
  platform: string;
  name: string;
  status: 'connected' | 'disconnected' | 'testing';
  lastTested: string;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: 'insights' | 'posts' | 'schedule' | 'system';
}

export default function SettingsPage() {
  const userData: UserData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_11b715d60-1762273834012.png",
    profileImageAlt: "Professional headshot of woman with shoulder-length brown hair wearing navy blazer"
  };

  const apiKeys: ApiKey[] = [
  {
    id: "twitter-api",
    platform: "X (Twitter)",
    name: "Twitter API v2",
    status: "connected",
    lastTested: "Nov 14, 2025 at 2:30 PM"
  },
  {
    id: "farcaster-api",
    platform: "Farcaster",
    name: "Farcaster Hub API",
    status: "disconnected",
    lastTested: "Never"
  },
  {
    id: "openai-api",
    platform: "OpenAI",
    name: "GPT-4 API",
    status: "connected",
    lastTested: "Nov 15, 2025 at 1:15 PM"
  }];


  const notifications: NotificationSetting[] = [
  {
    id: "new-insights",
    title: "New Project Insights",
    description: "Get notified when new insights are scraped from your projects",
    enabled: true,
    category: "insights"
  },
  {
    id: "insight-errors",
    title: "Scraping Errors",
    description: "Alert when there are issues scraping project data",
    enabled: true,
    category: "insights"
  },
  {
    id: "post-generated",
    title: "Post Generation Complete",
    description: "Notification when AI finishes generating new posts",
    enabled: true,
    category: "posts"
  },
  {
    id: "post-approval",
    title: "Posts Pending Approval",
    description: "Remind when generated posts need your review",
    enabled: false,
    category: "posts"
  },
  {
    id: "scheduled-posts",
    title: "Scheduled Post Reminders",
    description: "Get notified before posts are automatically published",
    enabled: true,
    category: "schedule"
  },
  {
    id: "schedule-conflicts",
    title: "Schedule Conflicts",
    description: "Alert when there are conflicts in your posting schedule",
    enabled: true,
    category: "schedule"
  },
  {
    id: "system-updates",
    title: "System Updates",
    description: "Important updates about BeadApp features and maintenance",
    enabled: true,
    category: "system"
  },
  {
    id: "security-alerts",
    title: "Security Alerts",
    description: "Notifications about account security and login attempts",
    enabled: true,
    category: "system"
  }];


  return (
    <SettingsInteractive
      userData={userData}
      apiKeys={apiKeys}
      notifications={notifications} />);


}