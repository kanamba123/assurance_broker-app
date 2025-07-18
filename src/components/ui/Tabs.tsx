import React, { useState, Children, ReactNode, isValidElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TabVariant = 'underline' | 'pill' | 'rounded';

interface TabProps {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
}

interface TabsProps {
  children: ReactNode;
  defaultTab?: string;
  variant?: TabVariant;
  className?: string;
  tabListClassName?: string;
  tabButtonClassName?: string;
  activeTabClassName?: string;
  disabledTabClassName?: string;
  contentClassName?: string;
  onChange?: (tabId: string) => void;
}

const variantStyles: Record<TabVariant, string> = {
  underline: 'border-b-2 border-transparent data-[active=true]:border-blue-600',
  pill: 'rounded-full px-4 py-1 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700',
  rounded: 'rounded-lg px-4 py-2 data-[active=true]:bg-blue-50',
};

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultTab = '',
  variant = 'underline',
  className = '',
  tabListClassName = '',
  tabButtonClassName = '',
  activeTabClassName = '',
  disabledTabClassName = '',
  contentClassName = '',
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === Tab
  ) as React.ReactElement<TabProps>[];

  if (tabs.length === 0) {
    console.warn('Tabs component requires at least one Tab child');
    return null;
  }

  if (!activeTab && tabs.length > 0) {
    const firstEnabledTab = tabs.find((tab) => !tab.props.disabled);
    if (firstEnabledTab) {
      setActiveTab(firstEnabledTab.props.id);
    }
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        className={`flex items-center gap-1 ${variant === 'underline' ? 'border-b border-gray-200' : ''} ${tabListClassName}`}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.props.id;
          const isDisabled = tab.props.disabled;

          return (
            <button
              key={tab.props.id}
              id={`tab-${tab.props.id}`}
              role="tab"
              aria-selected={isActive}
              aria-disabled={isDisabled}
              aria-controls={`tabpanel-${tab.props.id}`}
              onClick={() => !isDisabled && handleTabChange(tab.props.id)}
              disabled={isDisabled}
              data-active={isActive}
              className={`flex items-center gap-2 py-2 px-3 text-sm font-medium transition-colors ${
                isDisabled
                  ? `cursor-not-allowed text-gray-400 ${disabledTabClassName}`
                  : isActive
                  ? `text-blue-600 ${activeTabClassName}`
                  : 'text-gray-500 hover:text-gray-700'
              } ${variantStyles[variant]} ${tabButtonClassName}`}
            >
              {tab.props.icon && <span>{tab.props.icon}</span>}
              {tab.props.label}
              {variant === 'underline' && isActive && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  initial={false}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className={`${contentClassName}`} role="tabpanel">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => {
            if (tab.props.id !== activeTab) return null;

            return (
              <motion.div
                key={tab.props.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {tab.props.children}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};