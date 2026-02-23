import { ReactNode } from "react";
import PullToRefreshComponent from "react-pull-to-refresh";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}

/**
 * Pull-to-refresh wrapper component for mobile
 * Shows a refresh indicator when user pulls down on the page
 */
export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const handleRefresh = async () => {
    await onRefresh();
  };

  // Custom refresh indicator
  const RefreshIcon = () => (
    <div className="flex items-center justify-center py-4">
      <div className="flex flex-col items-center gap-2">
        <RefreshCw className="w-6 h-6 text-purple-400 animate-spin" />
        <span className="text-sm text-purple-300">Refreshing...</span>
      </div>
    </div>
  );

  return (
    <PullToRefreshComponent
      onRefresh={handleRefresh}
      icon={<RefreshIcon />}
      loading={<RefreshIcon />}
      className="pull-to-refresh-container"
    >
      {children}
    </PullToRefreshComponent>
  );
}
