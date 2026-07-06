import { useMemo, useState } from 'react';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/data/products';

const categories = ['All', 'Apple', 'Samsung', 'Amazon', 'Sony', 'Dell', 'HP', 'Fashion'];

const Products = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return allProducts.filter(p => {
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        category === 'All' || p.category.toLowerCase().includes(category.toLowerCase());
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">All Products</h1>
            <p className="text-muted-foreground">
              Browse our full catalog — electronics & fashion from top brands.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <Input
              placeholder="Search products or brands..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="md:max-w-sm"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <Button
                  key={c}
                  size="sm"
                  variant={category === c ? 'default' : 'outline'}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} withAnimation={false} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
