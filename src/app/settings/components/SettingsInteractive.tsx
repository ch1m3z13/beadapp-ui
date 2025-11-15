'use client';

import React, { useState, useEffect } from 'react';
import UserProfileSection from './UserProfileSection';
import ApiConfigurationSection from './ApiConfigurationSection';
import AppearanceSection from './AppearanceSection';
import NotificationSection from './NotificationSection';
import DataPrivacySection from './DataPrivacySection';
import BottomTabNavigation from '@/components/common/BottomTabNavigation';

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

interface SettingsInteractiveProps {
  userData: UserData;
  apiKeys: ApiKey[];
  notifications: NotificationSetting[];
}

const SettingsInteractive = ({ userData, apiKeys, notifications }: SettingsInteractiveProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-6 pb-20">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 pb-20">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, preferences, and application settings
          </p>
        </div>

        <div className="space-y-6">
          <UserProfileSection userData={userData} />
          <ApiConfigurationSection apiKeys={apiKeys} />
          <AppearanceSection />
          <NotificationSection notifications={notifications} />
          <DataPrivacySection />
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
};

export default SettingsInteractive;