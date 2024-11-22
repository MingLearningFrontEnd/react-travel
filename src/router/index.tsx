import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home, Login, Detail, Register, Search, ShoppingCart,PlaceOrder } from "../pages";
import { useSelector } from "react-redux";



const PrivateRoute = ({ children }: any) => {
    const { token } = useSelector((state: any) => state.userSlice)
    return token ? children : <Navigate to='/login' />
}

const router = createBrowserRouter(
    [
        {
            path: '/', element: <Home />
        },
        {
            path: '/login', element: <Login />
        },
        {
            path: '/register', element: <Register />
        },
        {
            path: '/detail/:touristRouteId', element: <Detail />
        },
        {
            path: '/search/:keyword?', element: <Search />
        },
        {
            path: '/shoppingCart', element: <PrivateRoute>
                <ShoppingCart />
            </PrivateRoute>
        },
        {
            path: '/placeOrder', element: <PrivateRoute>
                <PlaceOrder />
            </PrivateRoute>
        },
        {
            path: '*', element: <h1> 页面找不见了</h1>
        }
    ]
)
export default router