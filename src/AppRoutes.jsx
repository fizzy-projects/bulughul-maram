import {useRoutes, Outlet} from "react-router-dom";
import Layout from "./utils/Layout";
import { ArabicRoutes } from "./baam/arabic/Routes";
import Login from "./admin/Login";
import BulughulmaramPage from "./bulughulmaram/Main";
import Home from "./Home";

export default function AppRoutes(){
    const routes = [{
        element: <Layout includeHeader={true}/>,
        children: [
            {index:true, element:<Home/>},
            {path:"login", element:<Login/>},
            {path:"bulughulmaram", element:<BulughulmaramPage/>},
            ArabicRoutes
        ]
    }];
    return useRoutes(routes);
}