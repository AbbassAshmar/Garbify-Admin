import {createBrowserRouter} from "react-router-dom";
import Default from "./pages/Default/default";
import Dashboard from "./pages/Dashboard/dashboard";
import CreateProduct from "./pages/CreateProduct/create-product";
import CreateCategory from "./pages/CreateCategory/create-category";
import ListCategories from "./pages/ListCategories/list-categories";
import CategoriesTable from "./pages/CategoriesTable/categories-table";
import ListProducts from "./pages/ListProducts/list-products";
import CreateUser from "./pages/CreateUser/create-user";
import UsersTable from "./pages/UsersTable/users-table";
import OrdersTable from "./pages/OrdersTable/orders-table";
import EditProduct from "./pages/EditProduct/edit-product";

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
                path:"/products/:id/edit",
                element:<EditProduct />
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
                path:"/users/add",
                element:<CreateUser />
            },
            {
                path:"/users",
                element:<UsersTable />
            },
            {
                path:"/orders",
                element:<OrdersTable />
            },  
            {
                path:"*",
                element :<div>Error 404 Not Found</div>
            },
        ]

    },
    
]);