import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Star, BookOpen, Download, ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import { SEO } from "@/components/SEO";
import ProgressiveImage from "@/components/ProgressiveImage";

export default function ProductDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);

  // Fetch product by slug
  const { data: product, isLoading, error } = trpc.products.getBySlug.useQuery(
    { slug: slug || '' },
    { enabled: !!slug }
  );

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.productId === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId: product.id, quantity });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to cart`);
    
    // Trigger cart update event
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setLocation("/cart");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
        <Navigation />
        <div className="container py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
        <Navigation />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-bold text-purple-300 mb-4">Product Not Found</h1>
          <p className="text-gray-400 mb-8">The product you're looking for doesn't exist.</p>
          <Button onClick={() => setLocation("/shop")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      <SEO
        title={product.title}
        description={product.description || `${product.title} by ${product.author}`}
      />
      <Navigation />
      
      {/* Header */}
      <div className="border-b border-purple-500/20 bg-slate-950/50 backdrop-blur-sm">
        <div className="container py-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/shop")}
            className="text-purple-300 hover:text-purple-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </div>

      {/* Product Details */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <Card className="border-purple-500/20 bg-slate-900/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[3/4] relative bg-gradient-to-b from-purple-950/50 to-black">
                  {product.coverImage ? (
                    <ProgressiveImage
                      src={product.coverImage}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-24 h-24 text-purple-500/30" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {product.featured && (
              <Badge className="bg-purple-600 text-white border-0 text-lg px-4 py-2">
                ⭐ Featured Product
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="border-purple-500 text-purple-300 capitalize">
                  {product.category}
                </Badge>
                {product.gateNumber && (
                  <Badge variant="outline" className="border-amber-500 text-amber-300">
                    Gate {product.gateNumber}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-purple-100 mb-2">
                {product.title}
              </h1>
              
              {product.subtitle && (
                <p className="text-xl text-purple-300 mb-4">{product.subtitle}</p>
              )}
              
              {product.author && (
                <p className="text-lg text-gray-400">by {product.author}</p>
              )}
            </div>

            <Separator className="bg-purple-500/20" />

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold text-purple-400">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-2xl text-gray-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-xl font-semibold text-purple-200 mb-3">About This {product.category}</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            {/* Long Description */}
            {product.longDescription && (
              <div>
                <h3 className="text-xl font-semibold text-purple-200 mb-3">Details</h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap prose prose-invert max-w-none">
                  {product.longDescription}
                </div>
              </div>
            )}

            <Separator className="bg-purple-500/20" />

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-400">Quantity:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-purple-500/50"
                  >
                    -
                  </Button>
                  <span className="text-xl font-semibold text-purple-200 w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-purple-500/50"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 border-purple-500 text-purple-300 hover:bg-purple-950/50"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
                  size="lg"
                >
                  Buy Now
                </Button>
              </div>

              {product.downloadUrl && (
                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-300 hover:bg-green-950/50"
                  size="lg"
                  onClick={() => {
                    if (product.downloadUrl) {
                      window.open(product.downloadUrl, '_blank');
                    }
                  }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Digital Copy
                </Button>
              )}
            </div>

            {/* Additional Info */}
            <Card className="border-purple-500/20 bg-slate-900/50">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-purple-200 mb-4">Product Information</h3>
                
                {product.isbn && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">ISBN:</span>
                    <span className="text-purple-200">{product.isbn}</span>
                  </div>
                )}
                
                {product.format && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Format:</span>
                    <span className="text-purple-200">{product.format}</span>
                  </div>
                )}
                
                {product.duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-purple-200">{product.duration}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-purple-200 capitalize">{product.category}</span>
                </div>
                
                {product.gateNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gate:</span>
                    <span className="text-purple-200">Gate {product.gateNumber}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
