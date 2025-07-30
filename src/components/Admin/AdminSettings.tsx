import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: true,
    systemNotification: '',
    blogPost: {
      title: '',
      content: '',
      published: false
    }
  });

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    toast({
      title: "Settings Saved",
      description: "Platform settings have been updated successfully",
    });
  };

  const handlePublishBlog = () => {
    if (!settings.blogPost.title || !settings.blogPost.content) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }
    
    setSettings({
      ...settings,
      blogPost: { ...settings.blogPost, published: true }
    });
    
    toast({
      title: "Blog Post Published",
      description: "Your blog post has been published successfully",
    });
  };

  return (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle>Blog Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="blog-title">Post Title</Label>
            <Input
              id="blog-title"
              placeholder="Enter blog post title..."
              value={settings.blogPost.title}
              onChange={(e) => 
                setSettings({
                  ...settings,
                  blogPost: { ...settings.blogPost, title: e.target.value }
                })
              }
            />
          </div>
          
          <div>
            <Label htmlFor="blog-content">Post Content</Label>
            <Textarea
              id="blog-content"
              placeholder="Write your blog post content here..."
              rows={8}
              value={settings.blogPost.content}
              onChange={(e) => 
                setSettings({
                  ...settings,
                  blogPost: { ...settings.blogPost, content: e.target.value }
                })
              }
            />
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button onClick={handlePublishBlog} className="bg-stb-purple hover:bg-stb-purple/90 text-white w-full sm:w-auto">
              Publish Blog Post
            </Button>
            {settings.blogPost.published && (
              <span className="text-green-600 text-sm">✓ Published</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;