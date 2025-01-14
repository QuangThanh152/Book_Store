import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx'
import Home from "../pages/Home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import CartPage from "../pages/Books/CartPage.jsx";
import CheckoutPage from "../pages/Books/CheckoutPage.jsx";
import SingleBook from "../pages/Books/SingleBook.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/orders",
                element: <div>Mua hàng</div>
            },
            {
                path: "/about",
                element: <div>Thông tin</div>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/checkout",
                element: <CheckoutPage />
            },
            {
                path: "/books/:id",
                element: <SingleBook />
            },

        ]
    }
])

export default router