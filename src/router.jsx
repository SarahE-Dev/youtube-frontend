import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";

const Router = createBrowserRouter(
    [
        
        {
            path: "/",
            element: 
            (<Layout>
                <Home />
            </Layout>),

        }
        
    ]
);

export default Router;