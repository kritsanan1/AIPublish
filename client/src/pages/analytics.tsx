import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import StatsCards from "@/components/dashboard/stats-cards";
import AnalyticsChart from "@/components/dashboard/analytics-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Eye, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Analytics() {
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

  const { data: analytics, isLoading: analyticsLoading, error } = useQuery<{
    totalArticles: number;
    totalViews: number;
    totalUsers: number;
    totalRevenue: number;
  }>({
    queryKey: ["/api/analytics"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: insights, isLoading: insightsLoading } = useQuery<{
    insights: string;
  }>({
    queryKey: ["/api/analytics/insights"],
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

  if (error && isUnauthorizedError(error)) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background" data-testid="analytics-container">
      <Sidebar />
      
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header 
          title="Analytics Dashboard" 
          subtitle="Comprehensive insights and performance metrics for your content."
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Stats Overview */}
            <div className="mb-8">
              <StatsCards analytics={analytics} loading={analyticsLoading} />
            </div>

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Performance Chart */}
              <div className="lg:col-span-2">
                <AnalyticsChart analytics={analytics} loading={analyticsLoading} />
              </div>

              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-success mr-2" />
                    Key Performance Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-6 bg-muted rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 text-primary mr-2" />
                          <span className="text-sm text-muted-foreground">Avg. Views per Article</span>
                        </div>
                        <span className="text-lg font-semibold" data-testid="text-avg-views">
                          {analytics?.totalArticles && analytics?.totalArticles > 0 
                            ? Math.round((analytics?.totalViews || 0) / analytics.totalArticles) 
                            : 0}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 text-secondary mr-2" />
                          <span className="text-sm text-muted-foreground">User Engagement</span>
                        </div>
                        <Badge className="bg-success/10 text-success">
                          High
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 text-accent mr-2" />
                          <span className="text-sm text-muted-foreground">Revenue Growth</span>
                        </div>
                        <span className="text-lg font-semibold text-success">
                          +23%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BarChart3 className="w-4 h-4 text-primary mr-2" />
                          <span className="text-sm text-muted-foreground">Content Quality Score</span>
                        </div>
                        <span className="text-lg font-semibold">
                          8.7/10
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-accent mr-2" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                {insightsLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-muted rounded w-2/3 mb-3"></div>
                        <div className="h-3 bg-muted rounded w-full mb-2"></div>
                        <div className="h-3 bg-muted rounded w-4/5"></div>
                      </div>
                    ))}
                  </div>
                ) : (insights as any)?.insights?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(insights as any).insights.map((insight: any, index: number) => (
                      <div key={index} className="p-4 bg-muted/20 rounded-lg" data-testid={`insight-${index}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">
                            {insight.metric}
                          </h4>
                          <Badge 
                            variant={insight.trend === 'up' ? 'default' : insight.trend === 'down' ? 'destructive' : 'secondary'}
                          >
                            {insight.trend === 'up' ? '↗️' : insight.trend === 'down' ? '↘️' : '→'} {insight.value}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {insight.prediction}
                        </p>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground mr-2">
                            Confidence:
                          </span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${Math.round(insight.confidence * 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">
                            {Math.round(insight.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No Insights Available
                    </h3>
                    <p className="text-muted-foreground">
                      Analytics insights will appear here once you have more data to analyze.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detailed Analytics Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top Performing Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Getting Started with AI Content Creation", views: 2341 },
                      { title: "Advanced Analytics Techniques", views: 1892 },
                      { title: "Building Responsive Layouts", views: 1567 },
                      { title: "Modern Web Development", views: 1234 }
                    ].map((content, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <span className="text-sm font-medium truncate flex-1 mr-2">
                          {content.title}
                        </span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Eye className="w-4 h-4 mr-1" />
                          {content.views.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Engagement Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Average Time on Page</span>
                      <span className="text-sm font-semibold">4m 32s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Bounce Rate</span>
                      <span className="text-sm font-semibold">28.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Pages per Session</span>
                      <span className="text-sm font-semibold">3.2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Return Visitor Rate</span>
                      <span className="text-sm font-semibold">64.3%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Social Shares</span>
                      <span className="text-sm font-semibold">1,247</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
