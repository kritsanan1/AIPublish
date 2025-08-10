import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Bot, Wand2, Copy, Save } from "lucide-react";

interface GeneratedContent {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}

export default function ContentGenerator() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    contentType: "article",
    topic: "",
    tone: "professional",
    length: "medium",
  });
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const generateContentMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/ai/generate-content", data);
      return response.json();
    },
    onSuccess: (data: GeneratedContent) => {
      setGeneratedContent(data);
      toast({
        title: "สำเร็จ!",
        description: "สร้างเนื้อหาด้วย AI เรียบร้อยแล้ว",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
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
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถสร้างเนื้อหาได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim()) {
      toast({
        title: "กรุณาระบุหัวข้อ",
        description: "คุณต้องระบุหัวข้อเพื่อสร้างเนื้อหา",
        variant: "destructive",
      });
      return;
    }
    generateContentMutation.mutate(formData);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "คัดลอกแล้ว!",
      description: "คัดลอกเนื้อหาไปยังคลิปบอร์ดแล้ว",
    });
  };

  const contentTypeOptions = [
    { value: "article", label: "บทความ" },
    { value: "product_description", label: "คำอธิบายสินค้า" },
    { value: "social_media", label: "โซเชียลมีเดีย" },
    { value: "email", label: "อีเมลจดหมายข่าว" },
  ];

  const toneOptions = [
    { value: "professional", label: "เป็นทางการ" },
    { value: "casual", label: "เป็นกันเอง" },
    { value: "friendly", label: "มิตรภาพ" },
    { value: "formal", label: "เป็นทางการมาก" },
  ];

  const lengthOptions = [
    { value: "short", label: "สั้น (300-500 คำ)" },
    { value: "medium", label: "ปานกลาง (500-800 คำ)" },
    { value: "long", label: "ยาว (800-1200 คำ)" },
  ];

  return (
    <Card data-testid="content-generator-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="w-5 h-5 text-accent mr-2" />
          เครื่องมือสร้างเนื้อหาด้วย AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              ประเภทเนื้อหา
            </label>
            <Select 
              value={formData.contentType} 
              onValueChange={(value) => setFormData({...formData, contentType: value})}
            >
              <SelectTrigger data-testid="select-content-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {contentTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              หัวข้อ
            </label>
            <Input
              type="text"
              placeholder="ระบุหัวข้อหรือคำสำคัญ..."
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              data-testid="input-topic"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                โทนเสียง
              </label>
              <Select 
                value={formData.tone} 
                onValueChange={(value) => setFormData({...formData, tone: value})}
              >
                <SelectTrigger data-testid="select-tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                ความยาว
              </label>
              <Select 
                value={formData.length} 
                onValueChange={(value) => setFormData({...formData, length: value})}
              >
                <SelectTrigger data-testid="select-length">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lengthOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-accent hover:bg-accent/90 text-white"
            disabled={generateContentMutation.isPending}
            data-testid="button-generate-content"
          >
            {generateContentMutation.isPending ? (
              <div className="flex items-center">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                กำลังสร้างเนื้อหา...
              </div>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                สร้างเนื้อหา
              </>
            )}
          </Button>
        </form>

        {generatedContent && (
          <div className="mt-8 space-y-6" data-testid="generated-content">
            <div className="border-t pt-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center">
                <Bot className="w-4 h-4 text-accent mr-2" />
                เนื้อหาที่สร้างแล้ว
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">หัวเรื่อง</label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generatedContent.title)}
                      data-testid="button-copy-title"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      คัดลอก
                    </Button>
                  </div>
                  <Input 
                    value={generatedContent.title} 
                    readOnly 
                    className="bg-muted/50"
                    data-testid="generated-title"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">สรุปย่อ</label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generatedContent.excerpt)}
                      data-testid="button-copy-excerpt"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      คัดลอก
                    </Button>
                  </div>
                  <Textarea 
                    value={generatedContent.excerpt} 
                    readOnly 
                    className="bg-muted/50 min-h-[60px]"
                    data-testid="generated-excerpt"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground">เนื้อหา</label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generatedContent.content)}
                      data-testid="button-copy-content"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      คัดลอก
                    </Button>
                  </div>
                  <Textarea 
                    value={generatedContent.content} 
                    readOnly 
                    className="bg-muted/50 min-h-[200px]"
                    data-testid="generated-content-text"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">แท็ก</label>
                  <div className="flex flex-wrap gap-2">
                    {generatedContent.tags?.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        data-testid={`generated-tag-${index}`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90"
                    data-testid="button-save-as-draft"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    บันทึกเป็นร่าง
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    data-testid="button-publish-now"
                  >
                    เผยแพร่ทันที
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
