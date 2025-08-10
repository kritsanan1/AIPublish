import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3 } from "lucide-react";
import { useState } from "react";

interface AnalyticsChartProps {
  analytics?: {
    totalArticles: number;
    totalViews: number;
    totalUsers: number;
    totalRevenue: number;
  };
  loading?: boolean;
}

export default function AnalyticsChart({ analytics, loading }: AnalyticsChartProps) {
  const [timeRange, setTimeRange] = useState("7days");

  return (
    <Card data-testid="analytics-chart-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 text-primary mr-2" />
            ประสิทธิภาพของเนื้อหา
          </CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40" data-testid="select-time-range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 วันที่ผ่านมา</SelectItem>
              <SelectItem value="30days">30 วันที่ผ่านมา</SelectItem>
              <SelectItem value="3months">3 เดือนที่ผ่านมา</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] bg-muted/20 rounded-lg animate-pulse flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-32 mx-auto animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="h-[300px] gradient-bg rounded-lg p-6 flex items-center justify-center text-white" data-testid="chart-visualization">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mb-4 mx-auto opacity-80" />
              <h3 className="text-lg font-semibold mb-2 font-poppins">
                การวิเคราะห์ข้อมูลแบบกราฟ
              </h3>
              <p className="text-sm opacity-80">
                ประสิทธิภาพของเนื้อหา การมีส่วนร่วมของผู้ใช้ และตัวชี้วัดการเติบโต
              </p>
              
              {/* Mock chart data visualization */}
              <div className="mt-8 grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="h-16 bg-white/20 rounded"></div>
                  <div className="text-xs opacity-75">จันทร์</div>
                </div>
                <div className="space-y-2">
                  <div className="h-24 bg-white/30 rounded"></div>
                  <div className="text-xs opacity-75">อังคาร</div>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-white/25 rounded"></div>
                  <div className="text-xs opacity-75">พุธ</div>
                </div>
                <div className="space-y-2">
                  <div className="h-32 bg-white/40 rounded"></div>
                  <div className="text-xs opacity-75">พฤหัส</div>
                </div>
              </div>
              
              <div className="mt-4 text-xs opacity-60">
                ข้อมูล: บทความ {analytics?.totalArticles || 0}, การเข้าชม {analytics?.totalViews || 0}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
