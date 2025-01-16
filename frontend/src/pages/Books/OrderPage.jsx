import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext'

const OrderPage = () => {
  const { currentUser } = useAuth()
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
        <div className="flex items-center justify-center w-16 h-24 bg-gray-100 rounded-lg">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div className="flex-1">
          {/* <p className="text-sm text-gray-500">Product ID: {productId}</p> */}
          <p className="text-xs text-red-500">Không thể tải chi tiết sản phẩm!</p>
        </div>
      </div>
    )
  }

  return (
    <div className='container p-6 mx-auto'>
      <h1 className='mb-8 text-3xl font-bold tracking-tight'>Đơn hàng của bạn</h1>

      {orders.length === 0 ? (
        <div className="border rounded-lg">
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-lg text-gray-500">Không tìm thấy đơn đặt hàng!</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div key={order._id} className="overflow-hidden border rounded-lg">
              <div className="flex flex-row items-center gap-4 p-6 pb-4 border-b">
                <div className="flex items-center justify-center w-8 h-8 text-sm bg-gray-100 rounded-full">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm text-gray-500">ID Đơn Hàng</p>
                  <p className="font-mono text-sm">{order._id}</p>
                </div>
                <div className="px-2 py-1 ml-auto text-sm border rounded-full">
                  ${order.totalPrice}
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Khách Hàng</p>
                        <p>{order.name}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Số Điện Thoại</p>
                        <p>{order.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Địa Chỉ Đặt Hàng</p>
                        <p>
                          {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-sm text-gray-500">ID Sản Phẩm</p>
                    <div className="grid gap-3">
                      {order.productIds.map((product) => (
                        <div key={product} className="flex items-center gap-3">
                          {product.coverImage && (
                            <div className="relative w-16 h-16 overflow-hidden border rounded-lg">
                              <img
                                src={product.coverImage || "/placeholder.svg"}
                                alt="Product"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{product}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderPage

