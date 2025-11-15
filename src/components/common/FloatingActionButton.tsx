'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface FloatingActionButtonProps {
  className?: string;
  onPress?: () => void;
  visible?: boolean;
  disabled?: boolean;
}

const FloatingActionButton = ({ 
  className = '', 
  onPress,
  visible = true,
  disabled = false 
}: FloatingActionButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) return;
    
    if (onPress) {
      onPress();
    } else {
      router.push('/add-project');
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-label="Add new project"
      className={`
        fixed bottom-20 right-6 w-14 h-14 bg-primary text-primary-foreground
        rounded-full shadow-floating hover:shadow-elevated
        flex items-center justify-center z-101 transition-smooth
        hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 
        focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
    >
      <Icon 
        name="PlusIcon" 
        size={24} 
        variant="outline"
        className="text-primary-foreground"
      />
    </button>
  );
};

export default FloatingActionButton;