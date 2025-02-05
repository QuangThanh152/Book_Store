import { useState, useEffect } from "react"
import axios from "axios"
import { Package, ShoppingCart, CheckCircle, XCircle } from "lucide-react"
import Badge from "../../../components/ui/Badge"
import Button from "../../../components/ui/Button"
import Loading from "../../../components/Loading"
import getBaseUrl from "../../../utils/baseURL"

const ManageOrders = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    cancelledOrders: 0,
    orders: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        setData(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchData()
  }, [])

  const handleConfirmOrder = async (orderId) => {
    try {
      await axios.put(
        `${getBaseUrl()}/api/admin/${orderId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      setData((prevData) => {
        const updatedOrders = prevData.orders.map((order) =>
          order.id === orderId ? { ...order, status: "confirmed" } : order
        )
        return { ...prevData, orders: updatedOrders }
      })
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(
        `${getBaseUrl()}/api/admin/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      setData((prevData) => {
        const updatedOrders = prevData.orders.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order
        )
        return { ...prevData, orders: updatedOrders }
      })
    } catch (error) {
      console.error("Error:", error)
    }
  }

  if (loading) return <Loading />

  return (
    <>
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center p-8 bg-white rounded-lg shadow">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-purple-600 bg-purple-100 rounded-full">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">{data.totalOrders}</span>
            <span className="block text-gray-500">Tổng đơn hàng</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white rounded-lg shadow">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-yellow-600 bg-yellow-100 rounded-full">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">{data.pendingOrders}</span>
            <span className="block text-gray-500">Đơn hàng chờ xác nhận</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white rounded-lg shadow">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-green-600 bg-green-100 rounded-full">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">{data.confirmedOrders}</span>
            <span className="block text-gray-500">Đơn hàng đã xác nhận</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white rounded-lg shadow">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-16 h-16 mr-6 text-red-600 bg-red-100 rounded-full">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-2xl font-bold">{data.cancelledOrders}</span>
            <span className="block text-gray-500">Đơn hàng đã hủy</span>
          </div>
        </div>
      </section>

      {/* Render đơn hàng theo từng trạng thái */}
      <div className="mt-6">
        <div className="border rounded-md">
          <h3 className="p-4 text-lg font-bold">Tất cả đơn hàng</h3>
          <table className="w-full text-sm caption-bottom">
            <thead className="[&_tr]:border-b">
              <tr className="transition-colors border-b hover:bg-muted/50">
                <th className="h-12 px-4 font-medium text-left align-middle text-muted-foreground">Mã đơn</th>
                <th className="h-12 px-4 font-medium text-left align-middle text-muted-foreground">Khách hàng</th>
                <th className="h-12 px-4 font-medium text-left align-middle text-muted-foreground">Sản phẩm</th>
                <th className="h-12 px-4 font-medium text-left align-middle text-muted-foreground">Tổng tiền</th>
                <th className="h-12 px-4 font-medium text-left align-middle text-muted-foreground">Trạng thái</th>
                <th className="h-12 px-4 font-medium text-left align-middle text-muted-foreground">Thao tác</th>
              </tr>
            </thead>
            <tbody>
  {(data.orders || []).map((order) => (
    <tr key={order.id} className="transition-colors border-b hover:bg-muted/50">
      <td className="p-4 align-middle">{order.id}</td>
      <td className="p-4 align-middle">{order.customerName}</td>
      <td className="p-4 align-middle">
        <ul className="list-disc list-inside">
          {/* Hiển thị thông tin sản phẩm đã đặt */}
          {order.items.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong> x{item.quantity} - ${item.price}
            </li>
          ))}
        </ul>
      </td>
      <td className="p-4 align-middle">${order.total}</td>
      <td className="p-4 align-middle">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="p-4 align-middle">
        {order.status === "pending" && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleConfirmOrder(order.id)}>
              Xác nhận
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleCancelOrder(order.id)}>
              Hủy
            </Button>
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
    </>
  )
}

function OrderStatusBadge({ status }) {
  const statusConfig = {
    pending: { label: "Chờ xác nhận", variant: "secondary" },
    confirmed: { label: "Đã xác nhận", variant: "success" },
    cancelled: { label: "Đã hủy", variant: "destructive" },
  }

  const config = statusConfig[status] || statusConfig.pending

  return <Badge variant={config.variant}>{config.label}</Badge>
}

export default ManageOrders
