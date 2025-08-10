import { Button } from "@/components/ui/button";
import { Plus, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function Header({ title, subtitle, action }: HeaderProps) {
  const { user } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="bg-white shadow-sm border-b border-border" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className={isMobile ? "ml-16" : ""}>
            <h1 className="text-2xl font-bold text-foreground font-poppins" data-testid="text-header-title">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground mt-1" data-testid="text-header-subtitle">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {action && (
              <Button 
                className="bg-primary hover:bg-secondary text-white transition-colors duration-200"
                onClick={action.onClick}
                data-testid="button-header-action"
              >
                <Plus className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            )}
            
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="relative"
                data-testid="button-notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </div>
            
            {!isMobile && user && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground" data-testid="text-header-user-name">
                    {(user as any).firstName || (user as any).email || "ผู้ใช้"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(user as any).role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้'}
                  </p>
                </div>
                <img
                  className="h-8 w-8 rounded-full object-cover border border-border"
                  src={(user as any).profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
                  alt="Profile"
                  data-testid="img-header-profile"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}


