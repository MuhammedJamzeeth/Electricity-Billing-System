import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthLayout from "./pages/Auth/AuthLayout.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import HomeLayout from "./pages/Home/HomeLayout.jsx";
import Dashboard from "./pages/Home/Dashboard.jsx";

import User from "./pages/Home/User.jsx";

import Payment from "./pages/Payment/Payment.jsx";
import UserTable from "./features/user/components/UserTable.jsx";


const router = createBrowserRouter([
    {
        path: "/home",
        element: <HomeLayout />,
        children: [
            {
                path: "",
                element: <Dashboard/>
            }
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
    },
    {
        path: "/payment",
        element: <HomeLayout />,
        children: [
            {
                path: "",
                element: <Payment/>
            },
        ]
    },
    {
        path: "/user",
        element: <HomeLayout />,
        children: [
            {
                path: "",
                element: <User/>
            },
        ]
    }

]);

export default router;
