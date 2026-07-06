
import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import TrendingSection from '@/components/TrendingSection';
import HomeElectronicsSection from '@/components/HomeElectronicsSection';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  // Smooth scrolling for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
          behavior: 'smooth'
        });
      });
    });
    
    // Handle the button clicks for specific navigation
    const exploreAnalyticsBtn = document.getElementById('explore-analytics-btn');
    if (exploreAnalyticsBtn) {
      exploreAnalyticsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const dashboardSection = document.getElementById('dashboard');
        if (dashboardSection) {
          window.scrollTo({
            top: dashboardSection.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      });
    }
    
    const viewProductsBtn = document.getElementById('view-products-btn');
    if (viewProductsBtn) {
      viewProductsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const trendingSection = document.getElementById('trending');
        if (trendingSection) {
          window.scrollTo({
            top: trendingSection.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      });
    }
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
      
      const exploreAnalyticsBtn = document.getElementById('explore-analytics-btn');
      if (exploreAnalyticsBtn) {
        exploreAnalyticsBtn.removeEventListener('click', function() {});
      }
      
      const viewProductsBtn = document.getElementById('view-products-btn');
      if (viewProductsBtn) {
        viewProductsBtn.removeEventListener('click', function() {});
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <section id="trending">
          <TrendingSection />
        </section>
        <section id="electronics">
          <HomeElectronicsSection />
        </section>
        
        {/* Dashboard Section */}
        <section id="dashboard">
          <Dashboard />
        </section>
        
        {/* About Section */}
        <section id="about" className="py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About HOME TECH ANALYSIS</h2>
              <p className="text-muted-foreground">
                We're a leading analytics platform focused on home technology and consumer electronics trends.
                Our insights help businesses understand market dynamics and consumer preferences.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© 2024 HOME TECH ANALYSIS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
