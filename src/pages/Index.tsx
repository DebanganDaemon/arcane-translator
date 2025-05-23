
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import NovelGrid from '../components/NovelGrid';
import { getAllNovels } from '../database/db';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Novel } from '../types/novel';

const Index = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const fetchedNovels = await getAllNovels();
        setNovels(fetchedNovels);
      } catch (error) {
        console.error('Error fetching novels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  // Helper functions to filter novels
  const getRecentNovels = () => {
    return novels
      .filter(novel => novel.lastRead)
      .sort((a, b) => (b.lastRead?.timestamp || 0) - (a.lastRead?.timestamp || 0))
      .slice(0, 4);
  };

  const getRecentlyUpdatedNovels = () => {
    return novels
      .sort((a, b) => b.lastUpdated - a.lastUpdated)
      .slice(0, 4);
  };

  // For demonstration, we'll filter novels manually since language property is missing
  const chineseNovels = novels.filter(novel => novel.source === 'qidian');
  const koreanNovels = novels.filter(novel => novel.source === 'naver');
  const japaneseNovels = novels.filter(novel => novel.source === 'syosetu');

  const recentNovels = getRecentNovels();
  const updatedNovels = getRecentlyUpdatedNovels();

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-16 px-4 text-center">
          <p className="text-xl text-muted-foreground mb-4">Loading...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-10 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-xl mb-12">
            <div className="bg-novel-dark/80 text-white p-8 sm:p-12 rounded-xl">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                  Your Favorite Webnovels, Translated With AI
                </h1>
                <p className="text-lg mb-6 opacity-90">
                  Read Chinese, Korean, and Japanese webnovels seamlessly translated 
                  into English, right as you read.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-400 hover:from-indigo-700 hover:to-blue-500 border-none">
                    <Link to="/add">Add Your First Novel</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20">
                    <Link to="/library">Browse Library</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Reading Section */}
          {recentNovels.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-400">Continue Reading</h2>
                <Button asChild variant="ghost" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
                  <Link to="/library">View All</Link>
                </Button>
              </div>
              <div className="glass-card rounded-lg p-6">
                <NovelGrid novels={recentNovels} recent={true} />
              </div>
            </div>
          )}

          {/* Novels by Language */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-400">Browse by Language</h2>
            <div className="glass-card rounded-lg p-6">
              <Tabs defaultValue="chinese" className="w-full">
                <TabsList className="mb-6 bg-white/60 backdrop-blur-sm">
                  <TabsTrigger value="chinese">Chinese</TabsTrigger>
                  <TabsTrigger value="korean">Korean</TabsTrigger>
                  <TabsTrigger value="japanese">Japanese</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chinese">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-4">Popular Chinese Novels</h3>
                    <NovelGrid novels={chineseNovels} />
                  </div>
                </TabsContent>
                
                <TabsContent value="korean">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-4">Popular Korean Novels</h3>
                    <NovelGrid novels={koreanNovels} />
                  </div>
                </TabsContent>
                
                <TabsContent value="japanese">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium mb-4">Popular Japanese Novels</h3>
                    <NovelGrid novels={japaneseNovels} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Recently Updated Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-400">Recently Updated</h2>
              <Button asChild variant="ghost" className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
                <Link to="/library">View All</Link>
              </Button>
            </div>
            <div className="glass-card rounded-lg p-6">
              <NovelGrid novels={updatedNovels} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
