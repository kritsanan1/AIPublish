import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Bot, 
  CreditCard, 
  Users, 
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    testId: "nav-dashboard",
  },
  {
    name: "จัดการเนื้อหา",
    href: "/content",
    icon: FileText,
    testId: "nav-content",
  },
  {
    name: "วิเคราะห์ข้อมูล",
    href: "/analytics",
    icon: BarChart3,
    testId: "nav-analytics",
  },
  {
    name: "เครื่องมือ AI",
    href: "/ai-tools",
    icon: Bot,
    testId: "nav-ai-tools",
  },
  {
    name: "การชำระเงิน",
    href: "/payments",
    icon: CreditCard,
    testId: "nav-payments",
  },
  {
    name: "จัดการผู้ใช้",
    href: "/users",
    icon: Users,
    testId: "nav-users",
  },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return location === "/" || location === "/dashboard";
    }
    return location === href;
  };

  const SidebarContent = () => (
    <div className="flex flex-col flex-grow gradient-bg overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-6 py-8">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-poppins" data-testid="text-app-name">
              Ayrshaer CMS
            </h1>
            <p className="text-sm text-white/70">Content Platform</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="mt-5 flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:bg-white/20 font-medium transition-all duration-200",
                  active && "bg-white/20 text-white shadow-sm"
                )}
                data-testid={item.testId}
                onClick={() => isMobile && setIsMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      {/* User Profile */}
      <div className="flex-shrink-0 flex border-t border-white/20 p-6">
        <div className="flex items-center w-full">
          <img
            className="inline-block h-12 w-12 rounded-full object-cover border-2 border-white/20"
            src={(user as any)?.profileImageUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"}
            alt="Profile"
            data-testid="img-profile"
          />
          <div className="ml-4 flex-1">
            <p className="text-sm font-medium text-white" data-testid="text-user-name">
              {(user as any)?.firstName || (user as any)?.email || "ผู้ใช้"}
            </p>
            <p className="text-xs font-medium text-white/70" data-testid="text-user-role">
              {(user as any)?.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้'}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => window.location.href = '/api/logout'}
            data-testid="button-logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-white/90 backdrop-blur-sm"
            data-testid="button-mobile-menu"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div 
              className="absolute inset-0 bg-black/50" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] animate-slide-in">
              <SidebarContent />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-30" data-testid="sidebar-desktop">
      <SidebarContent />
    </div>
  );
}
