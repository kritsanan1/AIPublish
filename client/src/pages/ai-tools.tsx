import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import ContentGenerator from "@/components/ai/content-generator";
import PredictiveAnalytics from "@/components/ai/predictive-analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Zap, TrendingUp, Lightbulb } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function AITools() {
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

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/analytics"],
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
    <div className="flex h-screen overflow-hidden bg-background" data-testid="ai-tools-container">
      <Sidebar />
      
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header 
          title="AI Content Tools" 
          subtitle="Harness the power of artificial intelligence to create and analyze your content."
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* AI Tools Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-feature-content-generation">
                    Content Generation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Create high-quality articles, product descriptions, and marketing copy with AI assistance.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-feature-analytics">
                    Predictive Analytics
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get AI-powered insights and forecasting to optimize your content strategy.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Lightbulb className="w-12 h-12 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-feature-optimization">
                    Content Optimization
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Analyze and improve your existing content for better engagement and SEO.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main AI Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ContentGenerator />
              <PredictiveAnalytics 
                analytics={analytics} 
                loading={analyticsLoading} 
              />
            </div>

            {/* Additional AI Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Content Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 text-accent mr-2" />
                    Content Analysis & SEO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        SEO Score Analysis
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Analyze your content for SEO optimization opportunities and keyword density.
                      </p>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">Overall Score:</span>
                        <div className="flex-1 bg-muted rounded-full h-2 mr-2">
                          <div className="bg-success h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-success">75/100</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Readability Score
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Assess how easy your content is to read and understand for your target audience.
                      </p>
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">Readability:</span>
                        <div className="flex-1 bg-muted rounded-full h-2 mr-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-primary">Good</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <h4 className="font-semibold text-foreground mb-2">
                        Sentiment Analysis
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Understand the emotional tone and sentiment of your content.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Overall Sentiment:</span>
                        <span className="px-2 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                          Positive
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="w-5 h-5 text-accent mr-2" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                      <h4 className="font-semibold text-primary mb-2">
                        Content Strategy Tip
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Your "AI Content Creation" articles perform 23% better than average. Consider creating more content in this category.
                      </p>
                    </div>
                    
                    <div className="p-4 border-l-4 border-success bg-success/5 rounded-r-lg">
                      <h4 className="font-semibold text-success mb-2">
                        Engagement Boost
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Adding images to your articles increases engagement by 40%. Consider using more visual content.
                      </p>
                    </div>
                    
                    <div className="p-4 border-l-4 border-accent bg-accent/5 rounded-r-lg">
                      <h4 className="font-semibold text-accent mb-2">
                        Publishing Schedule
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Your audience is most active on Tuesday and Thursday mornings. Schedule your posts accordingly.
                      </p>
                    </div>
                    
                    <div className="p-4 border-l-4 border-secondary bg-secondary/5 rounded-r-lg">
                      <h4 className="font-semibold text-secondary mb-2">
                        Keyword Opportunity
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        "Machine Learning" is trending in your niche. Consider creating content around this topic.
                      </p>
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
