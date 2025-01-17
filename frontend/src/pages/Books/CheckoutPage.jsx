import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cart/cartSlice';

// import { createAOrder } from '../../../../backend/src/orders/order

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth(); // todo: lấy người dùng khi đăng nhập
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm()

    const [createOrder] = useCreateOrderMutation();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(false);
    const [showError, setShowError] = useState(false); // Trạng thái để hiển thị lỗi checkbox

    const onSubmit = async (data) => {
        if (!isChecked) {
            setShowError(true); // Hiển thị thông báo lỗi nếu checkbox chưa được tích
            return;
        }

        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice: totalPrice,
        };

        console.log(newOrder);

        try {
            await createOrder(newOrder).unwrap();
    
            // Hiển thị thông báo và điều hướng
            Swal.fire({
                title: "Đơn hàng đã xác nhận",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff url(/trees.png)",
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("/checkout-unscreen.gif")
                    left top
                    no-repeat
                `,
                text: "Đơn hàng của bạn đã được đặt thành công!",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            }).then(() => {
                // Xóa giỏ hàng sau khi đặt hàng thành công
                dispatch(clearCart()); // Thực hiện hành động xóa giỏ hàng
                navigate("/orders"); // Điều hướng đến trang danh sách đơn hàng
            });
        } catch (error) {
            console.error("Lỗi đặt hàng", error);
            toast.error("Lỗi khi đặt hàng");
        }
    };

    // if (isLoading) return <div>Loading....</div>
    return (
        <section>
            <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="mb-2 text-xl font-semibold text-gray-800">Thanh toán khi nhận hàng</h2>
                            <p className="mb-2 text-gray-500">
                                Tổng tiền: <span className="font-bold text-blue-500">${totalPrice}</span>
                            </p>
                            <p className="mb-6 text-gray-500">
                                Số lượng: <span className="font-bold text-blue-500">{cartItems.length > 0 ? cartItems.length : 0}</span>
                            </p>
                        </div>

                        <div className="p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 my-8 text-sm gap-y-2 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="text-lg font-medium">Thông tin cá nhân</p>
                                    <p>Vui lòng điền đầy đủ tất cả các trường.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Họ và tên</label>
                                            <input
                                                {...register("name", { required: true })}
                                                type="text" name="name" id="name" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label html="email">Email</label>
                                            <input

                                                type="text" name="email" id="email" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50"
                                                disabled
                                                defaultValue={currentUser?.email}
                                                placeholder="email@domain.com" />
                                        </div>
                                        <div className="md:col-span-5">
                                            <label html="phone">Số điện thoại</label>
                                            <input
                                                {...register("phone", { required: true })}
                                                type="number" name="phone" id="phone" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" placeholder="+123 456 7890" />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="address">Địa chỉ / Đường</label>
                                            <input
                                                {...register("address", { required: true })}
                                                type="text" name="address" id="address" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" placeholder="" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="city">Thành phố</label>
                                            <input
                                                {...register("city", { required: true })}
                                                type="text" name="city" id="city" className="w-full h-10 px-4 mt-1 border rounded bg-gray-50" placeholder="" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="country">Quốc gia / Khu vực</label>
                                            <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                                                <input
                                                    {...register("country", { required: true })}
                                                    name="country" id="country" placeholder="Country" className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none" />
                                                <button tabIndex="-1" className="text-gray-300 transition-all outline-none cursor-pointer focus:outline-none hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex="-1" className="text-gray-300 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="state">Tỉnh</label>
                                            <div className="flex items-center h-10 mt-1 border border-gray-200 rounded bg-gray-50">
                                                <input
                                                    {...register("state", { required: true })}
                                                    name="state" id="state" placeholder="State" className="w-full px-4 text-gray-800 bg-transparent outline-none appearance-none" />
                                                <button className="text-gray-300 transition-all outline-none cursor-pointer focus:outline-none hover:text-red-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                                <button tabIndex="-1" className="text-gray-300 transition-all border-l border-gray-200 outline-none cursor-pointer focus:outline-none hover:text-blue-600">
                                                    <svg className="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="md:col-span-1">
                                            <label htmlFor="zipcode">Zipcode</label>
                                            <input
                                                {...register("zipcode", { required: true })}
                                                type="text" name="zipcode" id="zipcode" className="flex items-center w-full h-10 px-4 mt-1 transition-all border rounded bg-gray-50" placeholder="" />
                                        </div>

                                        {/* Checkbox and Error Message */}
                                        <div className="mt-3 md:col-span-5">
                                            <div className="inline-flex items-center">
                                                <input
                                                    onChange={(e) => {
                                                        setIsChecked(e.target.checked);
                                                        setShowError(false); // Ẩn lỗi khi checkbox được tích
                                                    }}
                                                    type="checkbox"
                                                    id="billing_same"
                                                    className="form-checkbox" />
                                                <label htmlFor="billing_same" className="ml-2">Tôi đồng ý với <Link className='text-blue-600 underline'>Điều khoản & Điều kiện</Link> và <Link className='text-blue-600 underline'>Chính sách Mua sắm.</Link></label>
                                            </div>
                                            {showError && (
                                                <p className="mt-2 text-sm text-red-500">Bạn cần đồng ý với các điều khoản trước khi thanh toán.</p>
                                            )}
                                        </div>

                                        <div className="text-right md:col-span-5">
                                            <div className="inline-flex items-end">
                                                <button
                                                    onClick={(e) => {
                                                        if (!isChecked) {
                                                            e.preventDefault(); // Ngăn form gửi đi nếu chưa tích checkbox
                                                            setShowError(true); // Hiển thị thông báo lỗi
                                                        }
                                                    }}
                                                    type="submit"
                                                    className={`px-4 py-3 font-bold text-white bg-blue-500 rounded ${!isChecked ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                                                        }`}
                                                    disabled={!isChecked} // Vô hiệu hóa nút nếu chưa tích checkbox
                                                >
                                                    Thanh toán ngay
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckoutPage