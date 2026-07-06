import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';
import SearchModal from './SearchModal';

const NavBar = () => {
  const isMobile = useIsMobile();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Trending', href: '/#trending' },
    { label: 'Electronics', href: '/#electronics' },
    { label: 'Dashboard', href: '/#dashboard' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Login', href: '/login' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);
    
    if (href.includes('#')) {
      // If we're not on the home page and trying to navigate to a section
      if (window.location.pathname !== '/') {
        navigate('/');
        // Need to wait a bit for the navigation to complete before scrolling
        setTimeout(() => {
          const id = href.split('#')[1];
          const element = document.getElementById(id);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        }, 100);
      } else {
        // We're already on the home page, just scroll to the section
        const id = href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    } else {
      // Regular navigation to a different page
      navigate(href);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-in-out-soft ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-lg shadow-sm py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <nav className="flex items-center justify-between">
            <Link 
              to="/" 
              className="font-display text-xl font-medium tracking-tight transition-opacity duration-300 hover:opacity-80"
            >
              HOME TECH ANALYSIS
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              {items.map(item => (
                <NavLink 
                  key={item.href} 
                  to={item.href} 
                  label={item.label} 
                  onClick={() => handleNavigation(item.href)}
                />
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <button 
                className="p-2 rounded-full hover:bg-secondary transition-colors duration-300"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <Search size={20} className="text-foreground/80" />
              </button>
              <Link to="/cart" className="p-2 rounded-full hover:bg-secondary transition-colors duration-300 relative">
                <ShoppingBag size={20} className="text-foreground/80" />
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full">
                  {itemCount}
                </span>
              </Link>
            </div>

            <button 
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>

        <div 
          className={`md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-10">
              <Link 
                to="/" 
                className="font-display text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                HOME TECH ANALYSIS
              </Link>
              <button 
                className="p-2 rounded-full hover:bg-secondary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-6 text-xl">
              {items.map(item => (
                <MobileNavLink 
                  key={item.href} 
                  to={item.href} 
                  label={item.label} 
                  onClick={() => handleNavigation(item.href)} 
                />
              ))}
            </div>
            
            <div className="mt-auto flex space-x-4 pt-8">
              <button 
                className="p-3 rounded-full hover:bg-secondary transition-colors duration-300"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSearchModalOpen(true);
                }}
              >
                <Search size={20} />
              </button>
              <Link 
                to="/cart" 
                className="p-3 rounded-full hover:bg-secondary transition-colors duration-300 relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full">
                  {itemCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
};

const NavLink = ({ 
  to, 
  label, 
  onClick 
}: { 
  to: string; 
  label: string;
  onClick?: () => void;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.hash === to.substring(to.indexOf('#')));
  
  return (
    <button 
      onClick={onClick}
      className={`relative font-medium text-sm transition-colors duration-300 hover:text-primary ${
        isActive ? 'text-primary' : 'text-foreground/80'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
      )}
    </button>
  );
};

const MobileNavLink = ({ 
  to, 
  label, 
  onClick 
}: { 
  to: string; 
  label: string; 
  onClick: () => void 
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.hash === to.substring(to.indexOf('#')));
  
  return (
    <button 
      onClick={onClick}
      className={`text-left font-medium transition-colors duration-300 ${
        isActive ? 'text-primary' : 'text-foreground/80'
      }`}
    >
      {label}
    </button>
  );
};

export default NavBar;
