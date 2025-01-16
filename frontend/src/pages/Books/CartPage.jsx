// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { clearCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    // Tính tổng giá sản phẩm
    const totalPrice = cartItems
        .reduce((acc, item) => acc + item.newPrice, 0)
        .toFixed(2);

    //  Xóa 1 sản phẩm 
    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    // Hàm xử lý xóa tất cả sản phẩm
    const handleClearCart = () => {
        Swal.fire({
            title: "Bạn chắc chắn?",
            text: "Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
            cancelButtonText: "Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
                // Nếu người dùng chọn "OK", tiến hành xóa tất cả sản phẩm
                dispatch(clearCart());
                Swal.fire({
                    title: "Xóa thành công!",
                    text: "Tất cả sản phẩm đã bị xóa khỏi giỏ hàng.",
                    icon: "success",
                    confirmButtonText: "Đóng"
                });
            }
        });
    };

    return (
        <>
            <div className="container p-6 mx-auto mt-12 bg-white rounded-lg shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b">
                    <h1 className="text-2xl font-bold text-gray-900">Giỏ hàng</h1>
                    <button
                        type="button"
                        onClick={handleClearCart}
                        className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
                    >
                        Xóa hết sản phẩm
                    </button>
                </div>

                {/* Cart Items */}
                <div className="mt-6">
                    {cartItems.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((product) => (
                                <li key={product?._id} className="flex items-center py-6">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 overflow-hidden border rounded-lg">
                                        <img
                                            alt=""
                                            src={`${getImgUrl(product?.coverImage)}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                    {/* Thông tin sản phẩm */}
                                    <div className="flex flex-col flex-1 ml-4 ">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            <Link to="/">{product?.title}</Link>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            <span className="text-gray-900">Loại: </span>
                                            {product?.category}
                                        </p>
                                        <p className="mt-5 text-sm">
                                            <p className="text-gray-900">Số lượng: <span>1</span></p>
                                        </p>
                                    </div>

                                    {/* Giá và nút xóa sản phẩm */}
                                    <div className="flex flex-col items-end mb-2">
                                        <p className="text-lg font-medium text-gray-900">
                                            ${product?.newPrice}
                                        </p>
                                        <button
                                            onClick={() => handleRemoveFromCart(product)}
                                            className="mt-5 text-sm text-red-500 transition hover:text-red-600"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500">Không có sản phẩm!</p>
                    )}
                </div>

                {/* Total and Actions */}
                <div className="pt-6 mt-6 border-t">
                    <div className="flex justify-between text-2xl font-semibold text-gray-900">
                        <p>Tổng tiền</p>
                        <p>${totalPrice || 0}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        Phí vận chuyển và thuế được tính khi thanh toán.
                    </p>

                    <div className="flex items-center justify-between mt-6">
                    <Link
    to={cartItems.length > 0 ? "/checkout" : "#"}
    onClick={(e) => {
        if (cartItems.length === 0) {
            e.preventDefault(); // Ngăn chuyển hướng khi giỏ hàng trống
            Swal.fire({
                title: "Giỏ hàng trống!",
                text: "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.",
                icon: "warning",
                confirmButtonText: "Đóng",
            });
        }
    }}
    className={`px-6 py-3 font-medium text-white transition rounded-lg shadow ${
        cartItems.length > 0 ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
    }`}
>
    Thanh toán
</Link>

                        <Link to="/" className="text-sm text-indigo-600 hover:underline">
                            Tiếp tục mua →
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
