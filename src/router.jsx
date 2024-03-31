import {createBrowserRouter} from "react-router-dom";

import Default from "./pages/Default/default";
import Dashboard from "./pages/Dashboard/dashboard";

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
                path:"*",
                element :<div>Error 404 Not Found</div>
            },
        ]

    },
    
]);