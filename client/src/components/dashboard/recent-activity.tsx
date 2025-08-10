import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, Bot, Users, Clock } from "lucide-react";

interface RecentActivityProps {
  analytics?: {
    recentEvents?: Array<{
      id: string;
      eventType: string;
      createdAt: string;
      metadata?: any;
    }>;
  };
  loading?: boolean;
}

export default function RecentActivity({ analytics, loading }: RecentActivityProps) {
  const mockActivities = [
    {
      id: "1",
      type: "article_published",
      title: "เริ่มต้นกับการสร้างเนื้อหาด้วย AI",
      user: "John Doe",
      time: "2 ชั่วโมงที่ผ่านมา",
      icon: FileText,
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
    },
    {
      id: "2", 
      type: "subscription",
      title: "สมาชิกใหม่จาก Sarah Chen",
      user: "Sarah Chen",
      time: "4 ชั่วโมงที่ผ่านมา",
      icon: DollarSign,
      iconColor: "text-success",
      iconBg: "bg-success/10",
    },
    {
      id: "3",
      type: "ai_content",
      title: "สร้างเนื้อหา AI สำหรับแคมเปญการตลาด",
      user: "System",
      time: "1 วันที่ผ่านมา",
      icon: Bot,
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
    },
    {
      id: "4",
      type: "user_signup",
      title: "ผู้ใช้ใหม่ลงทะเบียน",
      user: "Mike Johnson",
      time: "2 วันที่ผ่านมา",
      icon: Users,
      iconColor: "text-secondary",
      iconBg: "bg-secondary/10",
    },
  ];

  const activities = analytics?.recentEvents?.length ? 
    analytics.recentEvents.map(event => ({
      id: event.id,
      type: event.eventType,
      title: getActivityTitle(event.eventType, event.metadata),
      user: event.metadata?.user || "System",
      time: getRelativeTime(event.createdAt),
      icon: getActivityIcon(event.eventType),
      iconColor: getActivityIconColor(event.eventType),
      iconBg: getActivityIconBg(event.eventType),
    })) : mockActivities;

  function getActivityTitle(eventType: string, metadata: any) {
    switch (eventType) {
      case 'article_view':
        return `บทความ "${metadata?.title || 'บทความ'}" ถูกเข้าชม`;
      case 'subscription':
        return `สมาชิกใหม่จาก ${metadata?.user || 'ผู้ใช้'}`;
      case 'payment':
        return `ชำระเงินสำเร็จ $${metadata?.amount || '0'}`;
      default:
        return 'กิจกรรมใหม่';
    }
  }

  function getRelativeTime(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "เมื่อไม่กี่นาทีที่ผ่านมา";
    if (diffInHours < 24) return `${diffInHours} ชั่วโมงที่ผ่านมา`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} วันที่ผ่านมา`;
  }

  function getActivityIcon(eventType: string) {
    switch (eventType) {
      case 'article_view':
      case 'article_published':
        return FileText;
      case 'subscription':
      case 'payment':
        return DollarSign;
      case 'ai_content':
        return Bot;
      default:
        return Clock;
    }
  }

  function getActivityIconColor(eventType: string) {
    switch (eventType) {
      case 'article_view':
      case 'article_published':
        return "text-primary";
      case 'subscription':
      case 'payment':
        return "text-success";
      case 'ai_content':
        return "text-accent";
      default:
        return "text-muted-foreground";
    }
  }

  function getActivityIconBg(eventType: string) {
    switch (eventType) {
      case 'article_view':
      case 'article_published':
        return "bg-primary/10";
      case 'subscription':
      case 'payment':
        return "bg-success/10";
      case 'ai_content':
        return "bg-accent/10";
      default:
        return "bg-muted/10";
    }
  }

  return (
    <Card data-testid="recent-activity-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 text-muted-foreground mr-2" />
          กิจกรรมล่าสุด
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 animate-pulse">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-muted rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {activities.slice(0, 4).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3" data-testid={`activity-${activity.id}`}>
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${activity.iconBg} rounded-full flex items-center justify-center`}>
                    <activity.icon className={`${activity.iconColor} w-4 h-4`} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground" data-testid={`activity-${activity.id}-title`}>
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid={`activity-${activity.id}-time`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
            
            <div className="mt-6">
              <Button 
                variant="ghost" 
                className="w-full text-primary hover:text-secondary"
                data-testid="button-view-all-activity"
              >
                ดูกิจกรรมทั้งหมด →
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
