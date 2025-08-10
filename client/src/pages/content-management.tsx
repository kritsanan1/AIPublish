import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, Filter, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  status: string;
  authorId: string;
  views: number;
  featuredImage?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ContentManagement() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useAuth();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    status: "draft",
    tags: [] as string[],
    featuredImage: "",
  });

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

  const { data: articles = [], isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
    enabled: isAuthenticated,
    retry: false,
  });

  const createArticleMutation = useMutation({
    mutationFn: async (articleData: any) => {
      await apiRequest("POST", "/api/articles", articleData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "Success",
        description: "Article created successfully!",
      });
      setIsCreateDialogOpen(false);
      resetForm();
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
        title: "Error",
        description: "Failed to create article. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: async ({ id, ...articleData }: any) => {
      await apiRequest("PUT", `/api/articles/${id}`, articleData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "Success",
        description: "Article updated successfully!",
      });
      setEditingArticle(null);
      resetForm();
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
        title: "Error",
        description: "Failed to update article. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      toast({
        title: "Success",
        description: "Article deleted successfully!",
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
        title: "Error",
        description: "Failed to delete article. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      status: "draft",
      tags: [],
      featuredImage: "",
    });
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || "",
      status: article.status,
      tags: article.tags || [],
      featuredImage: article.featuredImage || "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingArticle) {
      updateArticleMutation.mutate({
        id: editingArticle.id,
        ...formData,
      });
    } else {
      createArticleMutation.mutate(formData);
    }
  };

  const filteredArticles = articles.filter((article: Article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success/10 text-success';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
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

  return (
    <div className="flex h-screen overflow-hidden bg-background" data-testid="content-management-container">
      <Sidebar />
      
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header 
          title="Content Management" 
          subtitle="Create, edit, and manage your articles and content."
        />
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Content Management Header */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Edit className="w-5 h-5 text-primary mr-2" />
                    Content Management
                  </CardTitle>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-secondary" data-testid="button-create-content">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Content
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>
                          {editingArticle ? 'Edit Article' : 'Create New Article'}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Title
                          </label>
                          <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter article title..."
                            required
                            data-testid="input-title"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Excerpt
                          </label>
                          <Textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            placeholder="Brief description or excerpt..."
                            rows={2}
                            data-testid="input-excerpt"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Content
                          </label>
                          <Textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Write your article content here..."
                            rows={12}
                            required
                            data-testid="input-content"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Status
                            </label>
                            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                              <SelectTrigger data-testid="select-status">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Featured Image URL
                            </label>
                            <Input
                              value={formData.featuredImage}
                              onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                              placeholder="https://example.com/image.jpg"
                              data-testid="input-featured-image"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => {
                              setIsCreateDialogOpen(false);
                              setEditingArticle(null);
                              resetForm();
                            }}
                            data-testid="button-cancel"
                          >
                            Cancel
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={createArticleMutation.isPending || updateArticleMutation.isPending}
                            data-testid="button-save"
                          >
                            {editingArticle ? 'Update' : 'Create'} Article
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Search and Filter */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      data-testid="input-search"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40" data-testid="select-filter">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Articles Table */}
                {articlesLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
                  </div>
                ) : filteredArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <Edit className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {searchTerm || statusFilter ? 'Try adjusting your search or filter.' : 'Get started by creating your first article.'}
                    </p>
                    {!searchTerm && !statusFilter && (
                      <Button 
                        onClick={() => setIsCreateDialogOpen(true)}
                        data-testid="button-create-first"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Article
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Content
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Views
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {filteredArticles.map((article: Article) => (
                          <tr key={article.id} className="hover:bg-muted/50" data-testid={`row-article-${article.id}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {article.featuredImage && (
                                  <img 
                                    className="h-10 w-10 rounded-lg object-cover mr-4" 
                                    src={article.featuredImage} 
                                    alt="Article thumbnail"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none';
                                    }}
                                  />
                                )}
                                <div>
                                  <div className="text-sm font-medium text-foreground" data-testid={`text-title-${article.id}`}>
                                    {article.title}
                                  </div>
                                  {article.excerpt && (
                                    <div className="text-sm text-muted-foreground truncate max-w-md">
                                      {article.excerpt}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={getStatusColor(article.status)} data-testid={`status-${article.id}`}>
                                {article.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Eye className="w-4 h-4 mr-1" />
                                {article.views || 0}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              {new Date(article.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  handleEdit(article);
                                  setIsCreateDialogOpen(true);
                                }}
                                data-testid={`button-edit-${article.id}`}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this article?')) {
                                    deleteArticleMutation.mutate(article.id);
                                  }
                                }}
                                data-testid={`button-delete-${article.id}`}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
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
