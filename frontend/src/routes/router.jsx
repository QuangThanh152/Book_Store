import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx'
import Home from "../pages/Home/Home.jsx";

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
        ]
    }
])

export default router