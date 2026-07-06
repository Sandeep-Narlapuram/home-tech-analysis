
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import AnimatedImage from './AnimatedImage';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isTrending?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal';
  withAnimation?: boolean;
}

const ProductCard = ({ 
  product, 
  variant = 'default',
  withAnimation = true
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: `${product.title} has been ${isFavorited ? 'removed from' : 'added to'} your favorites.`,
      duration: 3000,
    });
  };

  // Calculate discounted price
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100) 
    : null;

  if (variant === 'compact') {
    return (
      <Link 
        to={`/product/${product.id}`}
        className="group relative overflow-hidden rounded-lg hover-card-animation"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
          <AnimatedImage 
            src={product.image} 
            alt={product.title}
            aspectRatio="portrait"
            className="group-hover:scale-105 transition-transform duration-700"
          />
          
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-foreground text-background text-xs font-medium px-2 py-0.5 rounded-full">
              New
            </span>
          )}
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 text-sm font-medium truncate">{product.title}</h3>
          <div className="mt-1 flex items-center gap-2">
            {discountedPrice ? (
              <>
                <p className="text-sm font-medium">₹{discountedPrice.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground line-through">₹{product.price.toFixed(2)}</p>
              </>
            ) : (
              <p className="text-sm font-medium">₹{product.price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'horizontal') {
    return (
      <Link 
        to={`/product/${product.id}`}
        className="group flex gap-4 hover-card-animation"
      >
        <div className="relative w-24 h-24 overflow-hidden rounded-lg">
          <AnimatedImage 
            src={product.image} 
            alt={product.title}
            aspectRatio="square"
            className="group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{product.category}</p>
          <h3 className="text-sm font-medium">{product.title}</h3>
          <div className="mt-1 flex items-center gap-2">
            {discountedPrice ? (
              <>
                <p className="text-sm font-medium">₹{discountedPrice.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground line-through">₹{product.price.toFixed(2)}</p>
              </>
            ) : (
              <p className="text-sm font-medium">₹{product.price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <div 
      className={`group relative overflow-hidden rounded-lg ${
        withAnimation ? 'hover-card-animation opacity-0' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={withAnimation ? {
        animation: 'fadeInUp 0.6s forwards',
        animationDelay: `${product.id * 0.1}s`
      } : {}}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
          <AnimatedImage 
            src={product.image} 
            alt={product.title}
            aspectRatio="portrait"
            className="group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-foreground text-background text-xs font-medium px-2 py-0.5 rounded-full">
                New
              </span>
            )}
            {product.isTrending && (
              <span className="bg-foreground/80 text-background text-xs font-medium px-2 py-0.5 rounded-full">
                Trending
              </span>
            )}
            {product.discount && (
              <span className="bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>
          
          {/* Action buttons */}
          <div 
            className={`absolute right-3 flex flex-col gap-2 transition-all duration-500 ${
              isHovered ? 'opacity-100 top-3' : 'opacity-0 top-6'
            }`}
          >
            <button 
              onClick={handleToggleFavorite}
              className="bg-background/80 hover:bg-background backdrop-blur-sm p-2 rounded-full transition-colors duration-300"
            >
              <Heart 
                size={18} 
                className={isFavorited ? 'fill-destructive text-destructive' : ''} 
              />
            </button>
            
            <button 
              onClick={handleAddToCart}
              className="bg-background/80 hover:bg-background backdrop-blur-sm p-2 rounded-full transition-colors duration-300"
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-3 space-y-1">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h3 className="text-base font-medium">{product.title}</h3>
          <div className="flex items-center gap-2">
            {discountedPrice ? (
              <>
                <p className="text-base font-medium">₹{discountedPrice.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground line-through">₹{product.price.toFixed(2)}</p>
              </>
            ) : (
              <p className="text-base font-medium">₹{product.price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
