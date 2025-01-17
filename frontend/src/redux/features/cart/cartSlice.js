import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2';

// Lấy dữ liệu giỏ hàng từ localStorage (nếu có)
const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

const initialState = {
    cartItems: savedCart // Khởi tạo state từ localStorage
};
  
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        // Thêm sản phẩm vào giỏ hàng
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push(action.payload);
                // Cập nhật localStorage
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

                Swal.fire({
                    title: "Thêm thành công!",
                    icon: "success",
                    draggable: true
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Sản phẩm đã tồn tại trong giỏ hàng!",
                });
            }
        },

        // Xóa sản phẩm khỏi giỏ hàng
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            // Cập nhật localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        // Làm sạch giỏ hàng
        clearCart: (state) => {
            state.cartItems = [];
            // Cập nhật localStorage
            localStorage.setItem('cartItems', JSON.stringify([]));
        }
    }
});

// Export các actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
