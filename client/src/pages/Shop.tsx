import { useState } from 'react'
import { SEO } from '@/components/SEO'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ShoppingCart, BookOpen, Headphones, Package, Star, Search, SlidersHorizontal } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { Link } from 'wouter'
import { toast } from 'sonner'
import { APP_TITLE } from '@/const'

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('newest')
  
  const { data: allProducts, isLoading } = trpc.products.getAll.useQuery()
  const { data: featuredProducts } = trpc.products.getFeatured.useQuery()

  // Filter and search products
  let filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts?.filter(p => p.category === selectedCategory)
  
  // Apply search
  if (searchQuery) {
    filteredProducts = filteredProducts?.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
  
  // Apply sorting
  if (filteredProducts) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })
  }

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  const addToCart = (productId: number) => {
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if product already in cart
    const existingItem = cart.find((item: any) => item.productId === productId)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ productId, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    toast.success('Added to cart!')
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'book':
      case 'course':
        return <BookOpen className="w-4 h-4" />
      case 'meditation':
        return <Headphones className="w-4 h-4" />
      case 'merchandise':
      case 'reading':
        return <Package className="w-4 h-4" />
      default:
        return <Star className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412]">
      <SEO 
        title={`Shop - ${APP_TITLE}`}
        description="Browse books, courses, meditations, and sacred tools for your journey through The 33rd House"
      />
      <Navigation />
      
      <main className="flex-1 container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif mb-4 text-[#d4af37]">
            The Sacred Library
          </h1>
          <p className="text-xl text-[#c4b5a0] max-w-3xl mx-auto">
            Books, courses, meditations, and tools to support your journey through the 144 realms
          </p>
        </div>

        {/* Search and Sort */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c4b5a0]" />
            <input
              type="text"
              placeholder="Search books, courses, meditations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1a0a2e] border border-[#9333ea]/30 rounded-lg text-[#f0e6d2] placeholder-[#c4b5a0]/50 focus:outline-none focus:border-[#9333ea]"
            />
          </div>
          
          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#c4b5a0]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-[#1a0a2e] border border-[#9333ea]/30 rounded-lg text-[#f0e6d2] focus:outline-none focus:border-[#9333ea] cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Featured Products */}
        {featuredProducts && featuredProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-serif text-[#d4af37] mb-6">Featured</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProducts.map((product: any) => (
                <Card key={product.id} className="bg-gradient-to-br from-[#9333ea]/10 to-[#1a0a2e] border-2 border-[#9333ea]">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="bg-[#d4af37] text-black">
                        Featured
                      </Badge>
                      <Badge variant="outline" className="border-[#9333ea] text-[#9333ea]">
                        {getCategoryIcon(product.category)}
                        <span className="ml-1 capitalize">{product.category}</span>
                      </Badge>
                    </div>
                    <CardTitle className="text-[#f0e6d2]">{product.title}</CardTitle>
                    {product.subtitle && (
                      <CardDescription className="text-[#c4b5a0]">{product.subtitle}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#c4b5a0] text-sm mb-4">{product.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#d4af37]">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-lg text-[#c4b5a0] line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Link href={`/shop/${product.slug}`} className="flex-1">
                      <Button variant="outline" className="w-full border-[#d4af37] text-[#d4af37]">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => addToCart(product.id)}
                      className="flex-1 bg-gradient-to-r from-[#9333ea] to-[#7c2dc7]"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-8 bg-[#1a0a2e] border border-[#9333ea] p-2">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            <TabsTrigger value="book" className="text-xs sm:text-sm">Books</TabsTrigger>
            <TabsTrigger value="course" className="text-xs sm:text-sm">Courses</TabsTrigger>
            <TabsTrigger value="meditation" className="text-xs sm:text-sm">Meditations</TabsTrigger>
            <TabsTrigger value="reading" className="text-xs sm:text-sm">Readings</TabsTrigger>
            <TabsTrigger value="merchandise" className="text-xs sm:text-sm">Merch</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-0">
            {isLoading ? (
              <div className="text-center py-12 text-[#c4b5a0]">
                Loading products...
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product: any) => (
                  <Card key={product.id} className="bg-[#1a0a2e] border border-[#d4af37]/30 hover:border-[#9333ea] transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        {product.gateNumber && (
                          <Badge variant="outline" className="border-[#d4af37] text-[#d4af37]">
                            Gate {product.gateNumber}
                          </Badge>
                        )}
                        <Badge variant="outline" className="border-[#9333ea] text-[#9333ea]">
                          {getCategoryIcon(product.category)}
                        </Badge>
                      </div>
                      <CardTitle className="text-[#f0e6d2] text-lg">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#c4b5a0] text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="text-2xl font-bold text-[#d4af37]">
                        {formatPrice(product.price)}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                      <Link href={`/shop/${product.slug}`} className="w-full">
                        <Button variant="outline" className="w-full border-[#d4af37] text-[#d4af37]">
                          Details
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => addToCart(product.id)}
                        className="w-full bg-gradient-to-r from-[#9333ea] to-[#7c2dc7]"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-[#c4b5a0]">
                No products found in this category
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
