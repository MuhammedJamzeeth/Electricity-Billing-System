import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthLayout from "./pages/Auth/AuthLayout.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        // errorElement: <NotFound />,
    },
    {
        path: "/auth",
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
