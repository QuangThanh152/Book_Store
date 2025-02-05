import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import { useFetchBookByIdQuery } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import { getImgUrl } from '../../../utils/getImgUrl';

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-center text-red-600">Lỗi khi tải trang UserDashboard</div>;

    return (
        <div className="py-16 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
            <div className="max-w-4xl p-6 mx-auto bg-white shadow-lg rounded-xl">
                <h1 className="mb-6 text-3xl font-semibold text-gray-800">Chào mừng, {currentUser?.name || 'Bạn'}!</h1>
                <p className="mb-8 text-lg text-gray-600">
                    Dưới đây là chi tiết đơn hàng của bạn:
                </p>

                <div className="mt-8">
                    <h2 className="mb-4 text-2xl font-semibold text-gray-800">Đơn hàng của bạn</h2>
                    {orders.length > 0 ? (
                        <ul className="space-y-6">
                            {orders.map((order) => (
                                <li key={order._id} className="p-5 transition-all shadow-md bg-gray-50 rounded-xl hover:shadow-xl">
                                    <p className="font-medium text-gray-700">Order ID: {order._id}</p>
                                    <p className="text-sm text-gray-500">Ngày đặt: {new Date(order?.createdAt).toLocaleDateString('vi-VN')}</p>
                                    <p className="mt-2 text-lg font-semibold text-gray-700">Tổng tiền: ${order.totalPrice}</p>

                                    <div className="mt-4">
                                        <h3 className="font-semibold text-gray-700">Sản phẩm trong đơn hàng:</h3>
                                        {order.productIds.map((productId) => (
                                            <BookItem key={productId} productId={productId} />
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Bạn chưa có đơn hàng nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const BookItem = ({ productId }) => {
    const { data: product, isLoading } = useFetchBookByIdQuery(productId);

    if (isLoading) return <p className="text-sm text-gray-500">Đang tải thông tin sản phẩm...</p>;
    if (!product) return <p className="text-sm text-red-500">Không tìm thấy sản phẩm</p>;

    return (
        <div className="flex items-center p-4 transition-all bg-white border rounded-lg shadow-md hover:shadow-lg">
            <img className="object-cover w-20 rounded-md h-30" src={getImgUrl(product.book.coverImage)} alt={product.book.title} />
            <div className="ml-4">
                <p className="font-semibold text-gray-800">{product.book.title}</p>
                <p className="text-sm text-gray-600">{product.book.category}</p>
                <p className="mt-2 text-sm font-semibold text-red-500">${product.book.newPrice}</p>
            </div>
        </div>
    );
};

export default UserDashboard;
