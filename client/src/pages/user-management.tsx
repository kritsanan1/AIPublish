import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Search, Filter, UserPlus, Settings, Shield, Crown, User } from "lucide-react";

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  subscriptionStatus?: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function UserManagement() {
  const { toast } = useToast();
  const { user: currentUser, isAuthenticated, isLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

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

  // Mock users data since we don't have a users API endpoint yet
  const mockUsers: User[] = [
    {
      id: "1",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      role: "admin",
      subscriptionStatus: "active",
      profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-20T15:45:00Z",
    },
    {
      id: "2",
      email: "sarah.chen@example.com",
      firstName: "Sarah",
      lastName: "Chen",
      role: "user",
      subscriptionStatus: "active",
      profileImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b332c5c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      createdAt: "2024-01-10T08:20:00Z",
      updatedAt: "2024-01-18T12:30:00Z",
    },
    {
      id: "3",
      email: "mike.johnson@example.com",
      firstName: "Mike",
      lastName: "Johnson",
      role: "user",
      subscriptionStatus: "inactive",
      createdAt: "2024-01-08T14:15:00Z",
      updatedAt: "2024-01-16T09:25:00Z",
    },
    {
      id: "4",
      email: "emma.wilson@example.com",
      firstName: "Emma",
      lastName: "Wilson",
      role: "user",
      subscriptionStatus: "active",
      profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      createdAt: "2024-01-05T16:40:00Z",
      updatedAt: "2024-01-19T11:15:00Z",
    },
  ];

  const users = mockUsers;
  const isLoading_users = false;

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4" />;
      case 'user':
        return <User className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-accent/10 text-accent';
      case 'user':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'ผู้ดูแลระบบ';
      case 'user':
        return 'ผู้ใช้';
      default:
        return role;
    }
  };

  const getSubscriptionColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSubscriptionText = (status?: string) => {
    switch (status) {
      case 'active':
        return 'ใช้งาน';
      case 'inactive':
        return 'ไม่ใช้งาน';
      default:
        return 'ฟรี';
    }
  };

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

  // Check if current user is admin
  if ((currentUser as any)?.role !== 'admin') {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="lg:pl-64 flex flex-col flex-1">
          <Header 
            title="การจัดการผู้ใช้" 
            subtitle="จัดการผู้ใช้และสิทธิ์การเข้าถึง"
          />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      ไม่มีสิทธิ์เข้าถึง
                    </h3>
                    <p className="text-muted-foreground">
                      คุณต้องเป็นผู้ดูแลระบบเพื่อเข้าถึงหน้านี้
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background" data-testid="user-management-container">
      <Sidebar />
      
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header 
          title="การจัดการผู้ใช้" 
          subtitle="จัดการผู้ใช้และสิทธิ์การเข้าถึงในระบบ"
          action={{
            label: "เพิ่มผู้ใช้",
            onClick: () => {
              toast({
                title: "คุณสมบัตินี้กำลังพัฒนา",
                description: "การเพิ่มผู้ใช้จะพร้อมใช้งานเร็วๆ นี้",
              });
            }
          }}
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">ผู้ใช้ทั้งหมด</p>
                      <p className="text-2xl font-bold text-foreground font-poppins" data-testid="text-total-users">
                        {users.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Crown className="w-6 h-6 text-accent" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">ผู้ดูแลระบบ</p>
                      <p className="text-2xl font-bold text-foreground font-poppins" data-testid="text-admin-users">
                        {users.filter(u => u.role === 'admin').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <User className="w-6 h-6 text-success" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">ผู้ใช้ทั่วไป</p>
                      <p className="text-2xl font-bold text-foreground font-poppins" data-testid="text-regular-users">
                        {users.filter(u => u.role === 'user').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <Shield className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">สมาชิกที่ใช้งาน</p>
                      <p className="text-2xl font-bold text-foreground font-poppins" data-testid="text-active-subscribers">
                        {users.filter(u => u.subscriptionStatus === 'active').length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  จัดการผู้ใช้
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="ค้นหาผู้ใช้..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="input-user-search"
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-40" data-testid="select-role-filter">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="บทบาททั้งหมด" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">บทบาททั้งหมด</SelectItem>
                      <SelectItem value="admin">ผู้ดูแลระบบ</SelectItem>
                      <SelectItem value="user">ผู้ใช้ทั่วไป</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Users Table */}
                {isLoading_users ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {searchTerm || roleFilter ? 'ไม่พบผู้ใช้ที่ตรงกัน' : 'ยังไม่มีผู้ใช้'}
                    </h3>
                    <p className="text-muted-foreground">
                      {searchTerm || roleFilter 
                        ? 'ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองของคุณ' 
                        : 'ผู้ใช้จะปรากฏที่นี่เมื่อมีการลงทะเบียน'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            ผู้ใช้
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            บทบาท
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            สถานะสมาชิก
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            วันที่สมัคร
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            การดำเนินการ
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-muted/50" data-testid={`user-row-${user.id}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img 
                                  className="h-12 w-12 rounded-full object-cover border border-border" 
                                  src={user.profileImageUrl || `https://ui-avatars.com/api/?name=${user.firstName || user.email}&background=667EEA&color=fff`}
                                  alt="Profile"
                                  onError={(e) => {
                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.firstName || user.email}&background=667EEA&color=fff`;
                                  }}
                                />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-foreground" data-testid={`user-name-${user.id}`}>
                                    {user.firstName && user.lastName 
                                      ? `${user.firstName} ${user.lastName}`
                                      : user.email
                                    }
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={getRoleColor(user.role)} data-testid={`user-role-${user.id}`}>
                                <span className="flex items-center">
                                  {getRoleIcon(user.role)}
                                  <span className="ml-1">{getRoleText(user.role)}</span>
                                </span>
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={getSubscriptionColor(user.subscriptionStatus)} data-testid={`user-subscription-${user.id}`}>
                                {getSubscriptionText(user.subscriptionStatus)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              {new Date(user.createdAt).toLocaleDateString('th-TH')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    toast({
                                      title: "คุณสมบัตินี้กำลังพัฒนา",
                                      description: "การแก้ไขข้อมูลผู้ใช้จะพร้อมใช้งานเร็วๆ นี้",
                                    });
                                  }}
                                  data-testid={`user-edit-${user.id}`}
                                >
                                  <Settings className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
