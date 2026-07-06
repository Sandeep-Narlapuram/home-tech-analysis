
import { useState } from 'react';
import { Heart, Share2, ShoppingBag, Check, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedImage from './AnimatedImage';
import CustomButton from './CustomButton';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import ProductCard, { Product } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

const ProductDetail = ({ product, relatedProducts = [] }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('description');
  const { toast } = useToast();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const isFashion = /Fashion|Tops|Bottoms|Outerwear|Knitwear|Formal|Dresses/i.test(
    product.category
  );

  const handleAddToCart = () => {
    if (isFashion && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.title}${selectedSize ? ` (Size: ${selectedSize})` : ''} × ${quantity} added to your cart.`,
      duration: 3000,
    });
  };

  const handleToggleFavorite = () => {
    setIsFavorited(!isFavorited);
    
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: `${product.title} has been ${isFavorited ? 'removed from' : 'added to'} your favorites.`,
      duration: 3000,
    });
  };

  const handleShare = () => {
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard.",
      duration: 3000,
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Calculate discounted price
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
        Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] rounded-xl overflow-hidden image-reveal">
            <AnimatedImage 
              src={product.image} 
              alt={product.title} 
              priority={true}
              aspectRatio="portrait"
            />
          </div>
          
          {/* Additional images would go here */}
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              {discountedPrice ? (
                <>
                  <span className="text-2xl font-bold">₹{discountedPrice.toFixed(2)}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{product.price.toFixed(2)}</span>
                  <span className="bg-destructive/10 text-destructive px-2 py-0.5 rounded-full text-sm font-medium">
                    Save {product.discount}%
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Size</span>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Size Guide
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      min-w-[48px] h-12 flex items-center justify-center border rounded-md text-sm font-medium transition-all
                      ${
                        selectedSize === size
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-foreground/30'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-8">
              <div className="flex h-12 w-32 border border-border rounded-md overflow-hidden">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 flex items-center justify-center border-r border-border text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  <ChevronDown size={18} />
                </button>
                <div className="flex-1 flex items-center justify-center text-sm font-medium">
                  {quantity}
                </div>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  className="w-10 flex items-center justify-center border-l border-border text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  <ChevronUp size={18} />
                </button>
              </div>
              
              <div className="flex-1 flex space-x-2">
                <CustomButton
                  fullWidth
                  size="lg"
                  onClick={handleAddToCart}
                  leftIcon={<ShoppingBag size={18} />}
                >
                  Add to Cart
                </CustomButton>
                
                <button 
                  onClick={handleToggleFavorite}
                  className={`
                    h-12 w-12 flex items-center justify-center rounded-md border transition-colors
                    ${
                      isFavorited 
                        ? 'border-destructive bg-destructive/10 text-destructive' 
                        : 'border-border hover:border-foreground/30'
                    }
                  `}
                >
                  <Heart size={18} className={isFavorited ? 'fill-destructive' : ''} />
                </button>
                
                <button 
                  onClick={handleShare}
                  className="h-12 w-12 flex items-center justify-center rounded-md border border-border hover:border-foreground/30 transition-colors"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
            
            {/* Features */}
            <div className="mb-8">
              <div className="flex flex-col space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-0.5 rounded-full bg-primary/10">
                    <Check size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">Free shipping on orders over $100</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-0.5 rounded-full bg-primary/10">
                    <Check size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">Free returns within 30 days</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-0.5 rounded-full bg-primary/10">
                    <Check size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm">Sustainably sourced materials</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Accordions */}
            <div className="border-t border-border pt-4 space-y-4">
              <div>
                <button 
                  onClick={() => toggleSection('description')}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <span className="font-medium">Description</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${
                      expandedSection === 'description' ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedSection === 'description' && (
                  <div className="pb-4 text-sm text-muted-foreground">
                    <p>
                      This premium piece features a timeless design with attention to detail in every stitch.
                      Made from high-quality materials that ensure both comfort and durability. Perfect for
                      everyday wear or special occasions.
                    </p>
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      <li>Premium fabric composition</li>
                      <li>Thoughtfully designed for comfort</li>
                      <li>Versatile styling options</li>
                      <li>Durable construction for long-lasting wear</li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="border-t border-border">
                <button 
                  onClick={() => toggleSection('materials')}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <span className="font-medium">Materials & Care</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${
                      expandedSection === 'materials' ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedSection === 'materials' && (
                  <div className="pb-4 text-sm text-muted-foreground">
                    <p className="mb-2">
                      <strong>Materials:</strong> 85% Cotton, 15% Polyester
                    </p>
                    <p className="mb-2">
                      <strong>Care Instructions:</strong>
                    </p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Machine wash cold with similar colors</li>
                      <li>Do not bleach</li>
                      <li>Tumble dry low</li>
                      <li>Iron on low heat if needed</li>
                      <li>Do not dry clean</li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="border-t border-border">
                <button 
                  onClick={() => toggleSection('shipping')}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <span className="font-medium">Shipping & Returns</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-300 ${
                      expandedSection === 'shipping' ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedSection === 'shipping' && (
                  <div className="pb-4 text-sm text-muted-foreground">
                    <p className="mb-2">
                      <strong>Shipping:</strong>
                    </p>
                    <ul className="mb-3 space-y-1 list-disc list-inside">
                      <li>Free standard shipping on orders over $100</li>
                      <li>Standard delivery: 3-5 business days</li>
                      <li>Express delivery: 1-2 business days</li>
                    </ul>
                    <p className="mb-2">
                      <strong>Returns:</strong>
                    </p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Free returns within 30 days of delivery</li>
                      <li>Item must be unworn, unwashed, and with original tags</li>
                      <li>Return label provided for convenient returns</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((product) => (
              <div key={product.id}>
                <ProductCard product={product} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
