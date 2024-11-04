import {Outlet} from "react-router-dom";
import SideBar from "../../features/home/component/SideBar.jsx";

const HomeLayout = () => {
    return (
        <main className="flex w-full h-screen bg-[#F4F7FE;]">
            <SideBar/>
            <Outlet/>
        </main>
    );
};

export default HomeLayout;