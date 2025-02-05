import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import CartPage from "../pages/Books/CartPage.jsx";
import CheckoutPage from "../pages/Books/CheckoutPage.jsx";
import SingleBook from "../pages/Books/SingleBook.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import OrderPage from "../pages/Books/OrderPage.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import ManageBook from "../pages/dashboard/ManageBook/ManageBook.jsx";
import AddBook from "../pages/dashboard/addBook/AddBook.jsx";
import EditBook from "../pages/dashboard/editBook/EditBook.jsx";
import UserDashboard from "../pages/dashboard/users/UserDashboard.jsx";
import ManageOders from "../pages/dashboard/ManageOrders/ManageOders.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/orders",
                element: (
                    <PrivateRoute>
                        <OrderPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/about",
                element: <div>Thông tin</div>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "/checkout",
                element: (
                    <PrivateRoute>
                        <CheckoutPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/books/:id",
                element: <SingleBook />,
            },

            {
                path: "/user-dashboard",
                element: <PrivateRoute><UserDashboard/></PrivateRoute>
              }
        ],
    },

    // admin login
    {
        path: "/admin",
        element: <AdminLogin />,
    },

    // admin
    {
        path: "/dashboard",
        element: (
            <AdminRoute>
                <DashboardLayout/>
            </AdminRoute>
        ),
        children: [
            {
                path: "",
                element: (
                    <AdminRoute>
                        <Dashboard />
                    </AdminRoute>
                ),
            },
            {
                path: "add-new-book",
                element: (
                    <AdminRoute>
                        <AddBook />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-orders",
                element: (
                    <AdminRoute>
                        <ManageOders />
                    </AdminRoute>
                ),
            },
            {
                path: "edit-book/:id",
                element: (
                    <AdminRoute>
                        <EditBook />
                    </AdminRoute>
                ),
            },
            {
                path: "manage-books",
                element: (
                    <AdminRoute>
                        <ManageBook />
                    </AdminRoute>
                ),
            },
        ],
    },
]);

export default router;
