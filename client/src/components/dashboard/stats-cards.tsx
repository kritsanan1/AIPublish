import { Card, CardContent } from "@/components/ui/card";
import { FileText, Eye, DollarSign, Users, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  analytics?: {
    totalArticles: number;
    totalViews: number;
    totalUsers: number;
    totalRevenue: number;
  };
  loading?: boolean;
}

export default function StatsCards({ analytics, loading }: StatsCardsProps) {
  const statsCards = [
    {
      title: "บทความทั้งหมด",
      value: analytics?.totalArticles || 0,
      change: "+12%",
      changeText: "from last month",
      icon: FileText,
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      testId: "card-total-articles",
    },
    {
      title: "การเข้าชมหน้าเว็บ",
      value: analytics?.totalViews || 0,
      change: "+8%",
      changeText: "from last week",
      icon: Eye,
      iconColor: "text-secondary",
      iconBg: "bg-secondary/10",
      testId: "card-page-views",
    },
    {
      title: "รายได้",
      value: `$${analytics?.totalRevenue || 0}`,
      change: "+23%",
      changeText: "from last month",
      icon: DollarSign,
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
      testId: "card-revenue",
    },
    {
      title: "ผู้ใช้ที่ใช้งาน",
      value: analytics?.totalUsers || 0,
      change: "+5%",
      changeText: "from last week",
      icon: Users,
      iconColor: "text-success",
      iconBg: "bg-success/10",
      testId: "card-active-users",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="stats-cards-container">
      {statsCards.map((card, index) => (
        <Card 
          key={index} 
          className="hover:shadow-md transition-shadow duration-200 animate-fade-in" 
          style={{ animationDelay: `${index * 0.1}s` }}
          data-testid={card.testId}
        >
          <CardContent className="pt-6">
            {loading ? (
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="p-2 bg-muted rounded-lg animate-pulse">
                    <div className="w-6 h-6 bg-muted-foreground/20 rounded"></div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                    <div className="h-6 bg-muted rounded w-1/2 mt-2 animate-pulse"></div>
                  </div>
                </div>
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  <div className={`p-2 ${card.iconBg} rounded-lg`}>
                    <card.icon className={`${card.iconColor} w-6 h-6`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground font-poppins" data-testid={`${card.testId}-value`}>
                      {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-success text-sm font-medium flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {card.change} {card.changeText}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
