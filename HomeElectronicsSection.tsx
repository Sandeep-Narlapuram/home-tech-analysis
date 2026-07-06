
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import CustomButton from './CustomButton';
import { electronicsProducts } from '@/data/products';

const HomeElectronicsSection = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slidesVisible, setSlidesVisible] = useState(3);
  const [isInView, setIsInView] = useState(false);

  // Update slides visible based on screen width
  useEffect(() => {
    const updateSlidesVisible = () => {
      if (window.innerWidth < 640) {
        setSlidesVisible(1);
      } else if (window.innerWidth < 1024) {
        setSlidesVisible(2);
      } else {
        setSlidesVisible(3);
      }
    };

    // Initial update
    updateSlidesVisible();

    // Add event listener
    window.addEventListener('resize', updateSlidesVisible);

    // Cleanup
    return () => window.removeEventListener('resize', updateSlidesVisible);
  }, []);

  // Add intersection observer to start animations when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const totalSlides = electronicsProducts.length;
  const maxIndex = totalSlides - slidesVisible;

  const handlePrev = () => {
    setActiveIndex((current) => Math.max(0, current - 1));
  };

  const handleNext = () => {
    setActiveIndex((current) => Math.min(maxIndex, current + 1));
  };

  return (
    <section id="electronics" className="py-20 overflow-hidden bg-muted/30">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <span className="inline-block text-sm font-medium text-muted-foreground mb-3">
              Featured Electronics
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Home Electronics
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-3 rounded-full transition-all duration-300 ${
                activeIndex === 0 
                  ? 'bg-secondary/50 text-muted-foreground cursor-not-allowed' 
                  : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }`}
            >
              <ArrowLeft size={18} />
            </button>
            
            <button 
              onClick={handleNext}
              disabled={activeIndex >= maxIndex}
              className={`p-3 rounded-full transition-all duration-300 ${
                activeIndex >= maxIndex 
                  ? 'bg-secondary/50 text-muted-foreground cursor-not-allowed' 
                  : 'bg-secondary hover:bg-secondary/80 text-foreground'
              }`}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        
        {/* Products Slider */}
        <div 
          ref={sliderRef}
          className="relative overflow-hidden"
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out-soft"
            style={{ transform: `translateX(-${activeIndex * (100 / slidesVisible)}%)` }}
          >
            {electronicsProducts.map((product) => (
              <div 
                key={product.id}
                className={`flex-none w-full sm:w-1/2 lg:w-1/3 p-4`}
              >
                <ProductCard 
                  product={product} 
                  withAnimation={isInView}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* View All Button */}
        <div className="mt-14 text-center">
          <CustomButton 
            variant="outline"
            size="lg"
            onClick={() => navigate('/products')}
          >
            View All Electronics
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default HomeElectronicsSection;
