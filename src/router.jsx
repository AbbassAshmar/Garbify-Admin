import {createBrowserRouter} from "react-router-dom";

import Default from "./pages/Default/default";
import Dashboard from "./pages/Dashboard/dashboard";
import CreateProduct from "./pages/CreateProduct/create-product";
import CreateCategory from "./pages/CreateCategory/create-category";

export const Router = createBrowserRouter([
    {
        path:"/",
        element:<Default />,

        children:[
            {
                path:"/",
                element:<Dashboard />
            },
            {
                path:"/products/add",
                element:<CreateProduct />
            },
            {
                path:"/categories/add",
                element:<CreateCategory />
            },
            {
                path:"*",
                element :<div>Error 404 Not Found</div>
            },
        ]

    },
    
]);