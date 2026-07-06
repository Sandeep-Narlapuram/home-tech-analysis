import { Product } from '@/components/ProductCard';

// Centralized product catalog (electronics + fashion). Prices are in INR.
export const allProducts: Product[] = [
  // ---------- Apple ----------
  {
    id: 1001,
    title: "Apple iPhone 15 Pro Max",
    price: 159900,
    image: "https://images.unsplash.com/photo-1696446702183-be9605d4f8e1?auto=format&fit=crop&w=800&q=80",
    category: "Apple • Smartphone",
    isTrending: true,
    isNew: true,
  },
  {
    id: 1002,
    title: "Apple MacBook Pro 14\" M3",
    price: 199900,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    category: "Apple • Laptop",
    isTrending: true,
    discount: 8,
  },
  {
    id: 1003,
    title: "Apple iPad Air (M2)",
    price: 59900,
    image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80",
    category: "Apple • Tablet",
    isNew: true,
  },
  {
    id: 1004,
    title: "Apple AirPods Pro (2nd Gen)",
    price: 24900,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80",
    category: "Apple • Audio",
    isTrending: true,
  },
  {
    id: 1005,
    title: "Apple Watch Series 9",
    price: 41900,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=800&q=80",
    category: "Apple • Wearable",
    discount: 10,
  },

  // ---------- Samsung ----------
  {
    id: 1101,
    title: "Samsung Galaxy S24 Ultra",
    price: 129999,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    category: "Samsung • Smartphone",
    isTrending: true,
  },
  {
    id: 1102,
    title: "Samsung 55\" 4K QLED TV",
    price: 84999,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    category: "Samsung • Television",
    discount: 18,
  },
  {
    id: 1103,
    title: "Samsung Galaxy Buds Pro",
    price: 12999,
    image: "https://images.unsplash.com/photo-1606741965509-717b9b8f9f73?auto=format&fit=crop&w=800&q=80",
    category: "Samsung • Audio",
  },

  // ---------- Amazon ----------
  {
    id: 1201,
    title: "Amazon Echo Dot (5th Gen)",
    price: 5499,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80",
    category: "Amazon • Smart Home",
    isTrending: true,
  },
  {
    id: 1202,
    title: "Amazon Kindle Paperwhite",
    price: 13999,
    image: "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?auto=format&fit=crop&w=800&q=80",
    category: "Amazon • E-Reader",
    isNew: true,
  },
  {
    id: 1203,
    title: "Amazon Fire TV Stick 4K",
    price: 5999,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b3?auto=format&fit=crop&w=800&q=80",
    category: "Amazon • Streaming",
    discount: 20,
  },

  // ---------- Sony ----------
  {
    id: 1301,
    title: "Sony WH-1000XM5 Headphones",
    price: 29990,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    category: "Sony • Audio",
    isTrending: true,
  },
  {
    id: 1302,
    title: "Sony PlayStation 5",
    price: 54990,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    category: "Sony • Gaming",
    isNew: true,
  },

  // ---------- Dell / HP ----------
  {
    id: 1401,
    title: "Dell XPS 13 Plus Laptop",
    price: 134990,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    category: "Dell • Laptop",
    discount: 12,
  },
  {
    id: 1402,
    title: "HP Spectre x360 14\"",
    price: 149990,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    category: "HP • Laptop",
  },

  // ---------- Fashion (trending) ----------
  {
    id: 1,
    title: "Oversized Cotton Shirt",
    price: 2499,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    category: "Fashion • Tops",
    isTrending: true,
  },
  {
    id: 2,
    title: "Slim Fit Denim Jeans",
    price: 3499,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    category: "Fashion • Bottoms",
    isTrending: true,
    isNew: true,
  },
  {
    id: 3,
    title: "Minimalist Leather Jacket",
    price: 8999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    category: "Fashion • Outerwear",
    isTrending: true,
    discount: 15,
  },
  {
    id: 4,
    title: "Casual Knit Sweater",
    price: 2899,
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    category: "Fashion • Knitwear",
    isTrending: true,
  },
  {
    id: 5,
    title: "Smart Casual Blazer",
    price: 6499,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
    category: "Fashion • Formal",
    isNew: true,
  },
  {
    id: 6,
    title: "Linen Summer Dress",
    price: 3999,
    image: "https://images.unsplash.com/photo-1624835567150-0c530a20d8cc?auto=format&fit=crop&w=800&q=80",
    category: "Fashion • Dresses",
    discount: 20,
  },
];

export const trendingProducts = allProducts.filter(p => p.isTrending);
export const electronicsProducts = allProducts.filter(p =>
  /Apple|Samsung|Amazon|Sony|Dell|HP/.test(p.category)
);

export const getProductById = (id: number) =>
  allProducts.find(p => p.id === id);
