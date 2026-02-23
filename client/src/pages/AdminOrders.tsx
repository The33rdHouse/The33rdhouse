import { useState } from 'react'
import { SEO } from '@/components/SEO'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Package, 
  DollarSign, 
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Download,
  Check,
  X,
  Clock
} from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { APP_TITLE } from '@/const'

export default function AdminOrders() {
  const [selectedTab, setSelectedTab] = useState('products')
  
  const { data: productOrders, isLoading: loadingProducts } = trpc.orders.getAll.useQuery()
  const { data: chartographyBookings, isLoading: loadingBookings } = trpc.chartography.getAllBookings.useQuery()

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      pending: { color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', label: 'Pending' },
      processing: { color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', label: 'Processing' },
      completed: { color: 'bg-green-500/20 text-green-300 border-green-500/30', label: 'Completed' },
      cancelled: { color: 'bg-red-500/20 text-red-300 border-red-500/30', label: 'Cancelled' },
      paid: { color: 'bg-green-500/20 text-green-300 border-green-500/30', label: 'Paid' },
      scheduled: { color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', label: 'Scheduled' },
      delivered: { color: 'bg-green-500/20 text-green-300 border-green-500/30', label: 'Delivered' }
    }
    
    const variant = variants[status] || variants.pending
    
    return (
      <Badge className={variant.color}>
        {variant.label}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a0412] via-[#1a0a2e] to-[#0a0412]">
      <SEO 
        title={`Admin - Orders & Bookings - ${APP_TITLE}`}
        description="Manage product orders and Chartography bookings"
      />
      <Navigation />
      
      <main className="flex-1 container py-12">
        <div className="mb-8">
          <h1 className="text-5xl font-serif mb-4 text-[#d4af37]">
            Orders & Bookings
          </h1>
          <p className="text-xl text-[#c4b5a0]">
            Manage product orders and Chartography reading bookings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#1a0a2e] border-2 border-[#9333ea]">
            <CardHeader className="pb-3">
              <CardDescription className="text-[#c4b5a0]">Total Orders</CardDescription>
              <CardTitle className="text-3xl text-[#d4af37]">
                {productOrders?.length || 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Package className="w-8 h-8 text-[#9333ea]" />
            </CardContent>
          </Card>

          <Card className="bg-[#1a0a2e] border-2 border-[#9333ea]">
            <CardHeader className="pb-3">
              <CardDescription className="text-[#c4b5a0]">Chartography Bookings</CardDescription>
              <CardTitle className="text-3xl text-[#d4af37]">
                {chartographyBookings?.length || 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar className="w-8 h-8 text-[#9333ea]" />
            </CardContent>
          </Card>

          <Card className="bg-[#1a0a2e] border-2 border-[#9333ea]">
            <CardHeader className="pb-3">
              <CardDescription className="text-[#c4b5a0]">Revenue (Orders)</CardDescription>
              <CardTitle className="text-3xl text-[#d4af37]">
                {formatPrice(productOrders?.reduce((sum: number, order: any) => sum + order.total, 0) || 0)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DollarSign className="w-8 h-8 text-[#9333ea]" />
            </CardContent>
          </Card>

          <Card className="bg-[#1a0a2e] border-2 border-[#9333ea]">
            <CardHeader className="pb-3">
              <CardDescription className="text-[#c4b5a0]">Revenue (Readings)</CardDescription>
              <CardTitle className="text-3xl text-[#d4af37]">
                {formatPrice((chartographyBookings?.filter((b: any) => b.status === 'paid').length || 0) * 19700)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DollarSign className="w-8 h-8 text-[#9333ea]" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#1a0a2e] border border-[#9333ea]">
            <TabsTrigger value="products">Product Orders</TabsTrigger>
            <TabsTrigger value="chartography">Chartography Bookings</TabsTrigger>
          </TabsList>

          {/* Product Orders Tab */}
          <TabsContent value="products">
            {loadingProducts ? (
              <div className="text-center py-12 text-[#c4b5a0]">
                Loading orders...
              </div>
            ) : productOrders && productOrders.length > 0 ? (
              <div className="space-y-4">
                {productOrders.map((order: any) => (
                  <Card key={order.id} className="bg-[#1a0a2e] border border-[#d4af37]/30">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-[#f0e6d2]">
                            Order #{order.id}
                          </CardTitle>
                          <CardDescription className="text-[#c4b5a0]">
                            {formatDate(order.createdAt)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Customer Info */}
                        <div>
                          <h4 className="text-sm font-semibold text-[#d4af37] mb-3">Customer</h4>
                          <div className="space-y-2 text-sm text-[#c4b5a0]">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {order.customerName || 'N/A'}
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {order.customerEmail || 'N/A'}
                            </div>
                            {order.shippingAddress && (
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5" />
                                <div>{order.shippingAddress}</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Order Details */}
                        <div>
                          <h4 className="text-sm font-semibold text-[#d4af37] mb-3">Order Details</h4>
                          <div className="space-y-2 text-sm text-[#c4b5a0]">
                            <div className="flex justify-between">
                              <span>Items:</span>
                              <span>{order.items?.length || 0}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Subtotal:</span>
                              <span>{formatPrice(order.subtotal || 0)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Tax:</span>
                              <span>{formatPrice(order.tax || 0)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-[#d4af37]">
                              <span>Total:</span>
                              <span>{formatPrice(order.total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      {order.items && order.items.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-[#9333ea]/30">
                          <h4 className="text-sm font-semibold text-[#d4af37] mb-3">Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item: any, index: number) => (
                              <div key={index} className="flex justify-between text-sm text-[#c4b5a0]">
                                <span>{item.productName} × {item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-6 flex gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-[#9333ea] text-[#9333ea]"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Invoice
                        </Button>
                        {order.status === 'pending' && (
                          <>
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Mark Completed
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-500"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel Order
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-[#1a0a2e] border-2 border-[#9333ea]">
                <CardContent className="py-16 text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 text-[#c4b5a0]" />
                  <h2 className="text-2xl font-serif text-[#f0e6d2] mb-2">No orders yet</h2>
                  <p className="text-[#c4b5a0]">Product orders will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Chartography Bookings Tab */}
          <TabsContent value="chartography">
            {loadingBookings ? (
              <div className="text-center py-12 text-[#c4b5a0]">
                Loading bookings...
              </div>
            ) : chartographyBookings && chartographyBookings.length > 0 ? (
              <div className="space-y-4">
                {chartographyBookings.map((booking: any) => (
                  <Card key={booking.id} className="bg-[#1a0a2e] border border-[#d4af37]/30">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-[#f0e6d2]">
                            Booking #{booking.id}
                          </CardTitle>
                          <CardDescription className="text-[#c4b5a0]">
                            {formatDate(booking.createdAt)}
                          </CardDescription>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Client Info */}
                        <div>
                          <h4 className="text-sm font-semibold text-[#d4af37] mb-3">Client Information</h4>
                          <div className="space-y-2 text-sm text-[#c4b5a0]">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {booking.fullName}
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {booking.email}
                            </div>
                            {booking.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {booking.phone}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Birth Details */}
                        <div>
                          <h4 className="text-sm font-semibold text-[#d4af37] mb-3">Birth Details</h4>
                          <div className="space-y-2 text-sm text-[#c4b5a0]">
                            <div className="flex justify-between">
                              <span>Date:</span>
                              <span>{booking.birthDate ? new Date(booking.birthDate).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time:</span>
                              <span>{booking.birthTime || 'Unknown'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Location:</span>
                              <span>{booking.birthLocation || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Questions */}
                      {booking.questions && (
                        <div className="mt-4 pt-4 border-t border-[#9333ea]/30">
                          <h4 className="text-sm font-semibold text-[#d4af37] mb-3">Client Questions</h4>
                          <p className="text-sm text-[#c4b5a0] whitespace-pre-wrap">
                            {booking.questions}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-6 flex gap-2">
                        {booking.status === 'paid' && (
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Mark Delivered
                          </Button>
                        )}
                        {booking.status === 'pending' && (
                          <Button 
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Schedule Reading
                          </Button>
                        )}
                        <Button 
                          variant="outline"
                          size="sm"
                          className="border-[#9333ea] text-[#9333ea]"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Reading
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-[#1a0a2e] border-2 border-[#9333ea]">
                <CardContent className="py-16 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-[#c4b5a0]" />
                  <h2 className="text-2xl font-serif text-[#f0e6d2] mb-2">No bookings yet</h2>
                  <p className="text-[#c4b5a0]">Chartography bookings will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
