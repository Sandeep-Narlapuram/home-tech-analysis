import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const formatPrice = (n: number) =>
  `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Stage = 'form' | 'placing' | 'success';

const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const { items, itemCount, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [stage, setStage] = useState<Stage>('form');
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStage('placing');
    setTimeout(() => {
      const id = `HTSA-${Date.now().toString().slice(-6)}`;
      setOrderId(id);
      setStage('success');
      toast({
        title: 'Order placed successfully!',
        description: `Order ${id} • ${itemCount} item(s) • ${formatPrice(subtotal)}`,
      });
      clearCart();
    }, 1200);
  };

  const handleClose = (next: boolean) => {
    if (!next && stage === 'success') {
      setStage('form');
      setOrderId('');
      navigate('/');
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {stage === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-in zoom-in duration-300">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">Order Confirmed!</DialogTitle>
              <DialogDescription className="text-center">
                Thank you, {form.fullName || 'customer'}. Your order{' '}
                <span className="font-semibold">{orderId}</span> has been placed.
                A confirmation has been sent to {form.email || 'your email'}.
              </DialogDescription>
            </DialogHeader>
            <div className="bg-muted/40 rounded-lg p-4 text-left text-sm max-w-sm mx-auto">
              <div className="flex justify-between mb-1">
                <span className="text-muted-foreground">Items</span>
                <span>{itemCount || '—'}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total paid</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
            <Button onClick={() => handleClose(false)} className="mt-2">
              Continue shopping
            </Button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder}>
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription>
                Enter your shipping and payment details to place your order.
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Shipping</h3>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" required value={form.fullName} onChange={update('fullName')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={form.email} onChange={update('email')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required value={form.address} onChange={update('address')} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required value={form.city} onChange={update('city')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP</Label>
                    <Input id="zip" required value={form.zip} onChange={update('zip')} />
                  </div>
                </div>

                <h3 className="font-semibold text-sm pt-2">Payment</h3>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input
                    id="cardNumber"
                    required
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={form.cardNumber}
                    onChange={update('cardNumber')}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" required placeholder="MM/YY" value={form.expiry} onChange={update('expiry')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" required inputMode="numeric" maxLength={4} value={form.cvv} onChange={update('cvv')} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Order summary</h3>
                <div className="bg-muted/40 rounded-lg p-4 space-y-3 max-h-64 overflow-y-auto">
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                  ) : (
                    items.map(({ product, quantity }) => {
                      const unit = product.discount
                        ? product.price - (product.price * product.discount) / 100
                        : product.price;
                      return (
                        <div key={product.id} className="flex gap-3 text-sm">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-12 h-12 rounded object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1">{product.title}</p>
                            <p className="text-xs text-muted-foreground">Qty {quantity}</p>
                          </div>
                          <span className="font-medium">{formatPrice(unit * quantity)}</span>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="border-t pt-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={stage === 'placing' || items.length === 0}>
                {stage === 'placing' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing order...
                  </>
                ) : (
                  `Place Order • ${formatPrice(subtotal)}`
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
