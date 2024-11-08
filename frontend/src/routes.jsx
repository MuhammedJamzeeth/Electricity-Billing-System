import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "./pages/Auth/AuthLayout.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import HomeLayout from "./pages/Home/HomeLayout.jsx";
import Dashboard from "./pages/Home/Dashboard.jsx";
import User from "./pages/Home/User.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Branches from "./pages/Home/Branches.jsx";
import AddBranch from "./pages/Home/AddBranch.jsx";
import EmployeeTable from "./pages/Employee/employee.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import EditBranch from "./pages/Home/EditBranch.jsx";


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
            },
            {
                path: "add-branch",
                element: <AddBranch/>
            },
            {
                path: "employee",
                element: <EmployeeTable/>
            },
            {
                path: "checkout",
                element: <Checkout/>
            },
            {
                path: "edit-branch/:id",
                element: <EditBranch/>
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
