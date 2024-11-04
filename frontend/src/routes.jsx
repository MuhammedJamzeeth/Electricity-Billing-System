import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthLayout from "./pages/Auth/AuthLayout.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import HomeLayout from "./pages/Home/HomeLayout.jsx";
import Dashboard from "./pages/Home/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: "/home",
        element: <HomeLayout />,
        children: [
            {
                path: "",
                element: <Dashboard/>
            },
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "",
                element: <SignIn/>
            },
            {
                path: "register",
                element: <SignUp/>
            }
        ]
    }

]);

export default router;
