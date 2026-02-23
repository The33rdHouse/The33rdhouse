import { SEO } from '@/components/SEO'
import Navigation from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Package, Calendar, DollarSign } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'wouter'
import { APP_TITLE } from '@/const'
import { EmptyOrders } from '@/components/EmptyStates'
import { OrderCardSkeleton } from '@/components/LoadingSkeletons'

export default function Orders() {
  const { isAuthenticated, user } = useAuth()
  const { data: orders, isLoading } = trpc.orders.getUserOrders.useQuery(undefined, {
    enabled: isAuthenticated
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412]">
        <SEO 
          title={`Order History - ${APP_TITLE}`}
          description="View your order history and download purchased digital content"
        />
        <Navigation />
        
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md w-full bg-[#1a0a2e] border-[#d4af37]">
            <CardHeader>
              <CardTitle className="text-[#d4af37]">Login Required</CardTitle>
              <CardDescription className="text-[#c4b5a0]">
                Please log in to view your order history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/login">
                <Button className="w-full bg-[#9333ea] hover:bg-[#7c2dc7]">
                  Go to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412]">
      <SEO 
        title={`Order History - ${APP_TITLE}`}
        description="View your order history and download purchased digital content"
      />
      <Navigation />
      
      <main className="flex-1 py-12 px-4">
        <div className="container max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-[#d4af37] mb-2">Order History</h1>
            <p className="text-[#c4b5a0]">
              View your past purchases and download your digital content
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]"></div>
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="bg-[#1a0a2e] border-[#d4af37]/30">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-[#d4af37] flex items-center gap-2">
                          <Package className="w-5 h-5" />
                          Order #{order.orderNumber}
                        </CardTitle>
                        <CardDescription className="text-[#c4b5a0] flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ${(order.totalAmount / 100).toFixed(2)}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={order.status === 'completed' ? 'default' : 'secondary'}
                        className={order.status === 'completed' ? 'bg-green-600' : 'bg-yellow-600'}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-[#0a0412] rounded-lg border border-[#d4af37]/20"
                        >
                          <div className="flex-1">
                            <h3 className="text-[#f0e6d2] font-medium mb-1">
                              {item.productTitle}
                            </h3>
                            <p className="text-sm text-[#c4b5a0]">
                              Quantity: {item.quantity} × ${(item.price / 100).toFixed(2)}
                            </p>
                          </div>
                          
                          {item.downloadUrl && (
                            <Button
                              asChild
                              size="sm"
                              className="bg-[#9333ea] hover:bg-[#7c2dc7]"
                            >
                              <a 
                                href={item.downloadUrl} 
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </a>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {order.status === 'completed' && (
                      <div className="mt-4 p-3 bg-green-900/20 border border-green-600/30 rounded-lg">
                        <p className="text-sm text-green-400">
                          ✓ Order completed. Your digital content is available for download above.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-[#1a0a2e] border-[#d4af37]/30">
              <CardContent className="py-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-[#d4af37] opacity-50" />
                <h3 className="text-xl font-serif text-[#d4af37] mb-2">No Orders Yet</h3>
                <p className="text-[#c4b5a0] mb-6">
                  You haven't made any purchases yet. Explore our Sacred Library to get started.
                </p>
                <Link href="/shop">
                  <Button className="bg-[#9333ea] hover:bg-[#7c2dc7]">
                    Browse Library
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
