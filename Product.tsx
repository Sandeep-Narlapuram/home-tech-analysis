
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import ProductDetail from '@/components/ProductDetail';
import { allProducts, getProductById } from '@/data/products';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const productId = id ? parseInt(id) : null;
  const product = productId !== null ? getProductById(productId) : undefined;
  
  // Get related products (excluding current product)
  const relatedProducts = allProducts.filter(p => p.id !== productId).slice(0, 8);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // If product not found, redirect to home
  useEffect(() => {
    if (!product && productId !== null) {
      navigate('/', { replace: true });
    }
  }, [product, productId, navigate]);
  
  if (!product) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-24">
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </main>
      <footer className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© 2024 TRENDIFY. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;
