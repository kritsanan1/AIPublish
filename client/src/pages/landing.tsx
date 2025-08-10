import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, BarChart3, Users, CreditCard, Bot } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-white">Ayrshaer CMS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-login"
              >
                เข้าสู่ระบบ
              </Button>
              <Button 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => window.location.href = '/api/login'}
                data-testid="button-get-started"
              >
                เริ่มใช้งาน
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" data-testid="text-hero-title">
            แพลตฟอร์มจัดการเนื้อหา
            <br />
            <span className="text-accent">ที่ขับเคลื่อนด้วย AI</span>
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto" data-testid="text-hero-description">
            จัดการเนื้อหา สร้างรายได้ และวิเคราะห์ข้อมูลได้อย่างมีประสิทธิภาพ 
            พร้อมเครื่องมือ AI ที่ช่วยสร้างเนื้อหาคุณภาพสูง
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg"
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-start-free"
            >
              <Zap className="w-5 h-5 mr-2" />
              เริ่มใช้งานฟรี
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
              data-testid="button-learn-more"
            >
              เรียนรู้เพิ่มเติม
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Bot className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2" data-testid="text-feature-ai">
                  เครื่องมือ AI
                </h3>
                <p className="text-white/70">
                  สร้างเนื้อหาคุณภาพสูงด้วย AI และเครื่องมือวิเคราะห์อัตโนมัติ
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <BarChart3 className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2" data-testid="text-feature-analytics">
                  การวิเคราะห์ข้อมูล
                </h3>
                <p className="text-white/70">
                  ติดตามผลการดำเนินงานและคาดการณ์แนวโน้มด้วยข้อมูลแบบ Real-time
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <CreditCard className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2" data-testid="text-feature-payments">
                  ระบบการชำระเงิน
                </h3>
                <p className="text-white/70">
                  รับชำระเงินและจัดการการสมัครสมาชิกได้อย่างง่ายดาย
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-textColor mb-4" data-testid="text-features-title">
              ฟีเจอร์ครบครันสำหรับธุรกิจของคุณ
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ทุกเครื่องมือที่จำเป็นสำหรับการจัดการเนื้อหาและธุรกิจออนไลน์
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "จัดการผู้ใช้",
                description: "ระบบจัดการผู้ใช้และสิทธิ์การเข้าถึงที่ครบถ้วน"
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "รายงานแบบ Real-time",
                description: "ติดตามข้อมูลและสถิติการใช้งานแบบเรียลไทม์"
              },
              {
                icon: <Bot className="w-6 h-6" />,
                title: "AI Content Generator",
                description: "สร้างเนื้อหาคุณภาพสูงด้วยปัญญาประดิษฐ์"
              },
              {
                icon: <CreditCard className="w-6 h-6" />,
                title: "ระบบชำระเงินที่ปลอดภัย",
                description: "รับชำระเงินผ่าน Stripe อย่างปลอดภัย"
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "การทำงานที่รวดเร็ว",
                description: "ระบบตอบสนองเร็วและใช้งานง่าย"
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "การสำรองข้อมูล",
                description: "ระบบสำรองข้อมูลอัตโนมัติเพื่อความปลอดภัย"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary mr-4">
                      {feature.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-textColor">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4" data-testid="text-cta-title">
            พร้อมที่จะเริ่มต้นแล้วหรือยัง?
          </h3>
          <p className="text-xl text-white/80 mb-8">
            เข้าร่วมกับธุรกิจหลายพันรายที่เลือกใช้ Ayrshaer CMS
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg"
            onClick={() => window.location.href = '/api/login'}
            data-testid="button-get-started-cta"
          >
            <Zap className="w-5 h-5 mr-2" />
            เริ่มใช้งานเลย
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-textColor text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold">Ayrshaer CMS</h4>
            </div>
            <p className="text-gray-400">
              © 2025 Ayrshaer CMS. สงวนลิขสิทธิ์.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
