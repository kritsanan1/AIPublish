import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { type Article } from "@shared/schema";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatsCards from "@/components/dashboard/stats-cards";
import AnalyticsChart from "@/components/dashboard/analytics-chart";
import RecentActivity from "@/components/dashboard/recent-activity";
import ContentTable from "@/components/content/content-table";
import ContentGenerator from "@/components/ai/content-generator";
import PredictiveAnalytics from "@/components/ai/predictive-analytics";
import { isUnauthorizedError } from "@/lib/authUtils";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: analytics, isLoading: analyticsLoading } = useQuery<{
    totalArticles: number;
    totalViews: number;
    totalUsers: number;
    totalRevenue: number;
    recentEvents?: { id: string; eventType: string; createdAt: string; metadata?: any; }[];
  }>({
    queryKey: ["/api/analytics"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
    enabled: isAuthenticated,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background" data-testid="dashboard-container">
      <Sidebar />
      
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header 
          title="Dashboard Overview" 
          subtitle="Welcome back! Here's what's happening with your content."
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Stats Cards */}
            <div className="mb-8">
              <StatsCards 
                analytics={analytics} 
                loading={analyticsLoading} 
              />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Analytics Chart */}
              <div className="lg:col-span-2">
                <AnalyticsChart 
                  analytics={analytics} 
                  loading={analyticsLoading} 
                />
              </div>

              {/* Recent Activity */}
              <div>
                <RecentActivity 
                  analytics={analytics} 
                  loading={analyticsLoading} 
                />
              </div>
            </div>

            {/* Content Management Section */}
            <div className="mb-8">
              <ContentTable 
                articles={articles} 
                loading={articlesLoading} 
              />
            </div>

            {/* AI Tools Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ContentGenerator />
              <PredictiveAnalytics 
                data={analytics as any} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
