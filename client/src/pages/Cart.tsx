import { useState, useEffect } from 'react'
import { SEO } from '@/components/SEO'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { Link } from 'wouter'
import { toast } from 'sonner'
import { APP_TITLE } from '@/const'

interface CartItem {
  productId: number
  quantity: number
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<any[]>([])

  const { data: allProducts } = trpc.products.getAll.useQuery()

  useEffect(() => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
  }, [])

  useEffect(() => {
    // Match cart items with product data
    if (allProducts && cartItems.length > 0) {
      const matchedProducts = cartItems.map(item => {
        const product = allProducts.find((p: any) => p.id === item.productId)
        return product ? { ...product, quantity: item.quantity } : null
      }).filter(Boolean)
      setProducts(matchedProducts)
    } else {
      setProducts([])
    }
  }, [allProducts, cartItems])

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId)
      return
    }

    const updatedCart = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const removeItem = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    toast.success('Item removed from cart')
  }

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0)
  const tax = Math.round(subtotal * 0.1) // 10% tax
  const total = subtotal + tax

  const checkoutMutation = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Checkout failed. Please try again.')
    }
  })

  const handleCheckout = () => {
    if (products.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    
    // Create line items for Stripe
    const lineItems = products.map(product => ({
      productId: product.id,
      quantity: product.quantity
    }))
    
    checkoutMutation.mutate({ lineItems })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412]">
      <SEO 
        title={`Shopping Cart - ${APP_TITLE}`}
        description="Review your cart and complete your purchase"
      />
      <Navigation />
      
      <main className="flex-1 container py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-serif mb-8 text-[#d4af37]">
            Your Cart
          </h1>

          {products.length === 0 ? (
            <Card className="bg-[#1a0a2e] border-2 border-[#9333ea]">
              <CardContent className="py-16 text-center">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#c4b5a0]" />
                <h2 className="text-2xl font-serif text-[#f0e6d2] mb-2">Your cart is empty</h2>
                <p className="text-[#c4b5a0] mb-6">Browse our collection to find sacred tools for your journey</p>
                <Link href="/shop">
                  <Button className="bg-gradient-to-r from-[#9333ea] to-[#7c2dc7]">
                    Browse Shop
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {products.map((product) => (
                  <Card key={product.id} className="bg-[#1a0a2e] border border-[#d4af37]/30">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <h3 className="text-xl font-serif text-[#f0e6d2] mb-2">{product.title}</h3>
                          {product.subtitle && (
                            <p className="text-sm text-[#c4b5a0] mb-3">{product.subtitle}</p>
                          )}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-[#0a0412] border border-[#d4af37] rounded-md">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                className="text-[#d4af37] hover:text-[#f0e6d2]"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="text-[#f0e6d2] w-8 text-center">{product.quantity}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                className="text-[#d4af37] hover:text-[#f0e6d2]"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeItem(product.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-[#d4af37]">
                            {formatPrice(product.price * product.quantity)}
                          </div>
                          <div className="text-sm text-[#c4b5a0]">
                            {formatPrice(product.price)} each
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="bg-gradient-to-br from-[#9333ea]/10 to-[#1a0a2e] border-2 border-[#9333ea] sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-[#d4af37]">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-[#f0e6d2]">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[#f0e6d2]">
                      <span>Tax (10%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t border-[#d4af37]/30 pt-4">
                      <div className="flex justify-between text-xl font-bold text-[#d4af37]">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                <Button 
                  onClick={handleCheckout}
                  disabled={checkoutMutation.isPending}
                  className="w-full bg-gradient-to-r from-[#9333ea] to-[#7c2dc7] text-lg py-6"
                >
                  {checkoutMutation.isPending ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
                  </CardFooter>
                </Card>

                <div className="mt-6 text-center">
                  <Link href="/shop">
                    <Button variant="outline" className="border-[#d4af37] text-[#d4af37]">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
