import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import CustomButton from './CustomButton';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the element
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      // Calculate the position as a percentage
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      // Apply subtle parallax effect
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el, index) => {
        const factor = (index + 1) * 10;
        const translateX = (xPercent - 0.5) * factor;
        const translateY = (yPercent - 0.5) * factor;
        
        (el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/30"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="parallax-element absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-b from-primary/10 to-primary/5 blur-3xl" />
        <div className="parallax-element absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-t from-primary/10 to-primary/5 blur-3xl" />
      </div>
      
      <div className="max-w-7xl w-full mx-auto px-6 md:px-10 grid gap-10 md:grid-cols-2 items-center pt-24">
        {/* Text Content */}
        <div className="space-y-8 text-center md:text-left max-w-xl mx-auto md:mx-0">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 mb-6 text-sm font-medium animate-fade-in">
            Home Tech Sales Analysis 2024
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Insights Into <span className="text-gradient">Tech</span> Market Trends
          </h1>
          
          <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover comprehensive analysis of home electronics market performance and consumer behavior patterns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CustomButton
              size="lg"
              rightIcon={<ArrowRight size={16} />}
              href="#dashboard"
              id="explore-analytics-btn"
            >
              Explore Analytics
            </CustomButton>
            
            <CustomButton
              variant="outline"
              size="lg"
              href="#trending"
              id="view-products-btn"
            >
              View Products
            </CustomButton>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                  <img 
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 40}.jpg`} 
                    alt="Customer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">4.9/5</span>
              <span className="text-muted-foreground"> from over 2,000+ users</span>
            </div>
          </div>
        </div>
        
        {/* Image Grid */}
        <div className="relative h-[500px] md:h-[600px] w-full">
          <div className="absolute top-0 right-0 w-3/4 h-4/5 rounded-lg overflow-hidden image-reveal animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <img 
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03" 
              alt="Home Electronics" 
              className="w-full h-full object-cover parallax-element"
            />
          </div>
          
          <div className="absolute bottom-0 left-0 w-2/3 h-3/5 rounded-lg overflow-hidden image-reveal animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <img 
              src="https://images.unsplash.com/photo-1588508065123-287b28e013da" 
              alt="Tech Gadgets" 
              className="w-full h-full object-cover parallax-element"
            />
          </div>
          
          <div className="absolute top-1/4 left-1/6 rounded-lg bg-background/70 backdrop-blur-md p-4 shadow-lg z-10 floating-panel animate-float animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-semibold">+15%</span>
              </div>
              <div>
                <h3 className="font-medium">Growth Rate</h3>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="w-5 h-10 rounded-full border-2 border-foreground/30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-fade-in animate-float" />
          </div>
          <span className="text-xs font-medium text-foreground/50">Scroll</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
