import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home";
import VideoShell from "./components/VideoShell";
import PlayVideo from "./components/PlayVideo";
import Favorites from "./components/Favorites";
import Playlists from "./components/Playlists";
import WatchLater from "./components/WatchLater";
import History from "./components/History";
import GetUserInfo from "./components/GetUserInfo";

const Router = createBrowserRouter(
    [
        
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/category/:categoryID/:categoryTitle",
                    element: <VideoShell />,
                },
                {
                    path: "videos/:videoID",
                    exact: true,
                    element: <PlayVideo />,
                },
                {
                    path: "/favorites",
                    element: <Favorites />,
                },
                {
                    path: "playlists",
                    element: <Playlists />,
                },
                {
                    path: "/watch-later",
                    element: <WatchLater />,
                },
                {
                    path: "/history",
                    element: <History />,
                },
                {
                    path: "/login",
                    element: <GetUserInfo />,
                },
                {
                    path: "/signup",
                    element: <GetUserInfo />,
                }
            ]
        }
    ]
);

export default Router;