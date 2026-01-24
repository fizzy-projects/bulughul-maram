import Layout from "../../utils/Layout"
import ArabicList from "./ArabicList"
import ArabicHome from "./Home";
import ProtectedRoute from "../../admin/ProtectedComponent";
import AddWordDetails from "./admin/AddWordDetails";

export const ArabicRoutes = {
    path: "arabic", // 👈 parent path defined ONCE
    element: <Layout/>,
    children: [
        {index:true, element:<ArabicHome/>},
        {path:"list", element:<ArabicList/>},
        {path:"addword", element:<AddWordDetails/>}

        // {element:<ProtectedRoute/>,  //wrapper route
        // children: [
        //     {element: <Layout/>, //layout wrapper
        //     children:[
        //         {path:"addword", element:<AddWordDetails/>}
        //     ]}
        // ]
        // }

        // {element:<ProtectedRoute/>,  //wrapper route
        // children: [
        //     {path:"addword", element:<AddWordDetails/>}
        //     ]
        // }
    ]
};