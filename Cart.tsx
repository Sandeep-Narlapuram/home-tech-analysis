import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import CheckoutDialog from '@/components/CheckoutDialog';

const formatPrice = (n: number) => `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const Cart = () => {
  const { items, itemCount, subtotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => setCheckoutOpen(true);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} className="mr-1" /> Continue shopping
          </button>

          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-muted-foreground mb-8">
            {itemCount === 0 ? 'Your cart is empty.' : `${itemCount} item(s) in your cart.`}
          </p>

          {items.length === 0 ? (
            <div className="bg-card rounded-lg border p-12 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="mb-6 text-muted-foreground">
                Looks like you haven't added anything yet.
              </p>
              <Button asChild>
                <Link to="/">Browse products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map(({ product, quantity }) => {
                  const unitPrice = product.discount
                    ? product.price - (product.price * product.discount) / 100
                    : product.price;
                  return (
                    <div
                      key={product.id}
                      className="bg-card rounded-lg border p-4 flex gap-4"
                    >
                      <Link to={`/product/${product.id}`} className="shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${product.id}`}
                          className="font-medium hover:underline line-clamp-2"
                        >
                          {product.title}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
                        <p className="font-semibold mt-2">{formatPrice(unitPrice)}</p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-2 hover:bg-secondary"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-medium">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-2 hover:bg-secondary"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <aside className="bg-card rounded-lg border p-6 h-fit space-y-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>
                  Clear cart
                </Button>
              </aside>
            </div>
          )}
        </div>
      </main>
      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  );
};

export default Cart;
