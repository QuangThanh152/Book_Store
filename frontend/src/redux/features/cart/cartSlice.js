import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2';

const initialState = {
    cartItems: []
  }
  
const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        // Thêm sản phẩm vào giỏ hàng
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!existingItem) {
                state.cartItems.push(action.payload)
                Swal.fire({
                    title: "Thêm thành công!",
                    icon: "success",
                    draggable: true
                  });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Sản phẩm đã tồn tại trong giỏ hàng!",
                  });
            }
        },

        // Xóa sản phẩm khỏi giỏ hàng
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },

        // Làm sạch giỏ hàng
        clearCart : (state) => {
            state.cartItems = []
        }
    }
})

// export the actions
export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;

