import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";

const Router = createBrowserRouter(
    [
        
        {
            path: "/",
            element: 
            (
                <Home />
            ),

        }
        
    ]
);

export default Router;