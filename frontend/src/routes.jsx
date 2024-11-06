import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "./pages/Auth/AuthLayout.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import HomeLayout from "./pages/Home/HomeLayout.jsx";
import Dashboard from "./pages/Home/Dashboard.jsx";
import User from "./pages/Home/User.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Branches from "./pages/Home/Branches.jsx";


const router = createBrowserRouter([
    {
        path: "/home",
        element: <HomeLayout />,
        children: [
            {
                path: "",
                element: <Dashboard/>
            },
            {
                path: "branch",
                element: <Branches/>
            },
            {
                path: "payment",
                element: <Payment/>
            },
            {
                path: "user",
                element: <User/>
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

]);

export default router;
