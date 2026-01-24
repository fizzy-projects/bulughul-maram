import Layout from "../utils/Layout";
import ArabicVocab from "./arabicVocab/Main"

export const BaamRoutes = {
    path: "baamarabic", // 👈 parent path defined ONCE
    element: <Layout/>,
    children: [
        {index:true, element:<ArabicVocab/>}
    ]
};