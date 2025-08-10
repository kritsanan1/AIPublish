import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, Target } from "lucide-react";

interface PredictiveAnalyticsProps {
  data?: {
    contentPerformance?: {
      prediction: "increasing" | "decreasing" | "stable";
      confidence: number;
      metric: string;
      value: number;
    };
    userGrowth?: {
      prediction: "increasing" | "decreasing" | "stable";
      confidence: number;
      metric: string;
      value: number;
    };
    revenueProjection?: {
      prediction: "increasing" | "decreasing" | "stable";
      confidence: number;
      metric: string;
      value: number;
    };
  };
}

export function PredictiveAnalytics({ data }: PredictiveAnalyticsProps) {
  const defaultData = {
    contentPerformance: {
      prediction: "increasing" as const,
      confidence: 85,
      metric: "Content Views",
      value: 24.5
    },
    userGrowth: {
      prediction: "increasing" as const,
      confidence: 78,
      metric: "User Growth",
      value: 12.3
    },
    revenueProjection: {
      prediction: "stable" as const,
      confidence: 92,
      metric: "Revenue",
      value: 8.7
    }
  };

  const analytics = data || defaultData;

  const getIcon = (prediction: string) => {
    switch (prediction) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <BarChart3 className="h-4 w-4 text-blue-600" />;
    }
  };

  const getColor = (prediction: string) => {
    switch (prediction) {
      case "increasing":
        return "text-green-600";
      case "decreasing":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">AI Predictions</h3>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(analytics).map(([key, item]) => (
          <Card key={key} data-testid={`prediction-card-${key}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {getIcon(item.prediction)}
                {item.metric}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className={`text-2xl font-bold ${getColor(item.prediction)}`}>
                  {item.prediction === "increasing" ? "+" : item.prediction === "decreasing" ? "-" : ""}
                  {item.value}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.confidence}% confidence
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.confidence}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}