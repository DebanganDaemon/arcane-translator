
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Library from "./pages/Library";
import NovelDetail from "./pages/NovelDetail";
import ChapterReader from "./pages/ChapterReader";
import AddNovel from "./pages/AddNovel";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import ChineseNovels from "./pages/ChineseNovels";
import KoreanNovels from "./pages/KoreanNovels";
import JapaneseNovels from "./pages/JapaneseNovels";
import GenrePage from "./pages/GenrePage";
import SourcePage from "./pages/SourcePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/library" element={<Library />} />
          <Route path="/novel/:id" element={<NovelDetail />} />
          <Route path="/novel/:novelId/chapter/:chapterNumber" element={<ChapterReader />} />
          <Route path="/add" element={<AddNovel />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/chinese" element={<ChineseNovels />} />
          <Route path="/korean" element={<KoreanNovels />} />
          <Route path="/japanese" element={<JapaneseNovels />} />
          <Route path="/genre/:genre" element={<GenrePage />} />
          <Route path="/source/:source" element={<SourcePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
