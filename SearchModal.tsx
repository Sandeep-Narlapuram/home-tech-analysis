
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for tech brands
const techBrands = [
  { id: 1, name: 'Apple', category: 'Electronics' },
  { id: 2, name: 'Samsung', category: 'Electronics' },
  { id: 3, name: 'Sony', category: 'Electronics' },
  { id: 4, name: 'LG', category: 'Home Appliances' },
  { id: 5, name: 'Dell', category: 'Computers' },
  { id: 6, name: 'HP', category: 'Computers' },
  { id: 7, name: 'Microsoft', category: 'Software' },
  { id: 8, name: 'Google', category: 'Software & Electronics' }
];

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(techBrands);
  const navigate = useNavigate();

  // Filter results based on search query
  useEffect(() => {
    if (query.trim() === '') {
      setResults(techBrands);
    } else {
      const filteredResults = techBrands.filter(
        brand => brand.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [query]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you might navigate to search results page
    console.log('Searching for:', query);
  };

  // Handle brand selection
  const handleSelectBrand = (brandId: number) => {
    // Navigate to product page for selected brand
    navigate(`/product/${brandId}`);
    onClose();
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-start justify-center p-4">
      <div className="relative w-full max-w-2xl mt-16 bg-card rounded-lg shadow-lg">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Search Tech Brands</h2>
          
          <form onSubmit={handleSearch} className="mb-6">
            <Input
              type="search"
              placeholder="Type to search brands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
              autoFocus
            />
          </form>
          
          <div className="max-h-[60vh] overflow-y-auto">
            <h3 className="font-medium text-muted-foreground mb-2">
              {query ? `Results for "${query}"` : 'Popular Brands'}
            </h3>
            
            <ul className="space-y-1">
              {results.length === 0 ? (
                <li className="p-2 text-muted-foreground">No results found</li>
              ) : (
                results.map(brand => (
                  <li key={brand.id}>
                    <button
                      className="w-full text-left p-3 hover:bg-primary/10 rounded-md flex justify-between items-center group"
                      onClick={() => handleSelectBrand(brand.id)}
                    >
                      <span className="font-medium">{brand.name}</span>
                      <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        {brand.category}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
