import { createBrowserRouter } from "react-router-dom";
import { Home,Login,Detail,Register,Search } from "../pages";


 const router = createBrowserRouter(
    [
        {
            path:'/', element:<Home/>
        },
        {
            path:'/login', element:<Login/>
        },
        {
            path:'/register',element:<Register/>
        },
        {
            path:'/detail/:touristRouteId',element:<Detail/>
        },
        {
            path:'/search/:keyword' , element:<Search/>
        },
        {
            path:'*',element:<h1> 页面找不见了</h1>
        }
    ]
)
export default router