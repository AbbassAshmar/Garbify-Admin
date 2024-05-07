import {createBrowserRouter} from "react-router-dom";

import Default from "./pages/Default/default";
import Dashboard from "./pages/Dashboard/dashboard";
import CreateProduct from "./pages/CreateProduct/create-product";
import CreateCategory from "./pages/CreateCategory/create-category";
import ListCategories from "./pages/ListCategories/list-categories";
import CategoriesTable from "./pages/CategoriesTable/categories-table";
import ListProducts from "./pages/ListProducts/list-products";

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
                path:"/categories/tree",
                element:<ListCategories />
            },
            {
                path:"/categories/table",
                element:<CategoriesTable />
            },  
            {
                path:"/products",
                element:<ListProducts />
            
            },  
            {
                path:"*",
                element :<div>Error 404 Not Found</div>
            },
        ]

    },
    
]);