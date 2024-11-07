import {usePage} from "../../../contexts/PageContext.jsx";

const Header = () => {

    const  { pageName } = usePage();
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <div className="flex items-center pt-[32px] px-[32px] justify-between w-full">
            <div className="flex font-dm flex-col">
                <div className="text-[14px] capitalize text-[#707EAE] font-medium">
                    Page Details
                </div>
                <div className="text-[34px] text-[#2B3674] capitalize font-bold">
                    {pageName ? pageName.split("/").filter(Boolean).pop() : "Manage User"}
                </div>
                <div className="text-[20px] capitalize text-[#05CD99] font-bold">
                    {user?.username || "Manage User"}
                </div>
            </div>
        </div>
    );
};

export default Header;