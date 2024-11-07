import {Outlet} from "react-router-dom";
import SideBar from "../../features/home/component/SideBar.jsx";
import {PageProvider} from "../../contexts/PageContext.jsx";
import Header from "../../features/home/component/Header.jsx";

const HomeLayout = () => {
    return (
        <PageProvider>
            <main className="flex w-full h-screen bg-[#F4F7FE;]">
                <SideBar/>
                <div className="flex flex-col w-full">
                    <Header/>
                    <Outlet/>
                </div>
            </main>
        </PageProvider>

    );
};

export default HomeLayout;