import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SearchBar from './SearchBar';
import { Book, Library, Plus, Moon, Sun, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavigation = false }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { setTheme, theme } = useTheme();
  
  const getBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Home', path: '/' }];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      let name = segment.charAt(0).toUpperCase() + segment.slice(1);
      if (segment === 'novel' && pathSegments[index + 1]) {
        name = 'Novel Details';
      } else if (segment === 'chapter' && pathSegments[index + 1]) {
        name = `Chapter ${pathSegments[index + 1]}`;
      }
      
      breadcrumbs.push({
        name,
        path: currentPath,
        isLast
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavigation && (
        <header className="border-b bg-white/95 backdrop-blur-md shadow-sm dark:bg-gray-900/95 dark:border-gray-800">
          <div className="container mx-auto py-4 px-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <Link to="/" className="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-200">
              <span className="floating-animation inline-block">✨</span> Arcane Translator
            </Link>
            
            <div className="flex items-center space-x-4">
              <SearchBar />
              
              {/* Theme Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Settings className="mr-2 h-4 w-4" />
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/add">
                <Button size="sm" className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Novel
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Breadcrumbs */}
          {breadcrumbs.length > 1 && (
            <div className="container mx-auto px-4 pb-2">
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={crumb.path}>
                    {index > 0 && <span className="text-gray-400">/</span>}
                    {crumb.isLast ? (
                      <span className="text-foreground font-medium">{crumb.name}</span>
                    ) : (
                      <Link 
                        to={crumb.path} 
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </div>
          )}
          
          <div className="container mx-auto px-4 pb-2">
            <Tabs value={pathname === "/" ? "/" : pathname.split("/")[1]} className="w-full">
              <TabsList className="w-full justify-start bg-white/70 backdrop-blur-sm dark:bg-gray-800/70">
                <TabsTrigger value="/" asChild>
                  <Link to="/" className="transition-all duration-200">
                    <Book className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="library" asChild>
                  <Link to="/library" className="transition-all duration-200">
                    <Library className="h-4 w-4 mr-2" />
                    Library
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="chinese" asChild>
                  <Link to="/chinese" className="transition-all duration-200">
                    <span className="mr-2">🇨🇳</span>
                    Chinese
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="korean" asChild>
                  <Link to="/korean" className="transition-all duration-200">
                    <span className="mr-2">🇰🇷</span>
                    Korean
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="japanese" asChild>
                  <Link to="/japanese" className="transition-all duration-200">
                    <span className="mr-2">🇯🇵</span>
                    Japanese
                  </Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </header>
      )}
      
      <main className="flex-1 app-container">
        {children}
      </main>
      
      {!hideNavigation && (
        <footer className="border-t py-8 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4 gradient-text">Arcane Translator</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered translation for your favorite webnovels. Read Chinese, Korean, and Japanese novels seamlessly.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/library" className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Library</Link></li>
                  <li><Link to="/add" className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Add Novel</Link></li>
                  <li><Link to="/chinese" className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Chinese Novels</Link></li>
                  <li><Link to="/korean" className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Korean Novels</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Real-time AI translation</li>
                  <li>• Multiple reading themes</li>
                  <li>• Progress tracking</li>
                  <li>• Bookmark chapters</li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground dark:border-gray-800">
              &copy; {new Date().getFullYear()} Arcane Translator • Built with ❤️ for novel enthusiasts
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
