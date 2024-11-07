import image from "../../../lib/image.js";
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PersonIcon from '@mui/icons-material/Person';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import {Link, useNavigate} from "react-router-dom";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';


const SideBar = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const nav = useNavigate()

    const handleClick = () => {
        localStorage.removeItem('user')
        nav("/")
    }

    return (
        <div className="relative h-full flex w-[290px] bg-white flex-col">
            <div className="flex mt-[43px] pl-4 items-center">
                <img src={image.Bulb || ''} className="w-[68px]" alt="bulb"/>
                <div className="font-poppin pt-2 text-[#2B3674] text-[26px] font-bold">
                    Group 07
                </div>
            </div>
            <div className="flex flex-col mt-10 pl-4 gap-4">
                <Link to={'/home'} className="flex items-center pl-4">
                    <HomeIcon className="text-[#A3AED0]"/>
                    <div className="font-poppin pl-4 text-[#A3AED0] text-[14px] [line-height:30px] [letter-spacing:-0.32px]">
                        Dashboard
                    </div>
                </Link>
                <Link to={'/home/payment'} className="flex items-center pl-4">
                    <EqualizerIcon className="text-[#A3AED0]"/>
                    <div className="font-poppin pl-4 text-[#A3AED0] text-[14px] [line-height:30px] [letter-spacing:-0.32px]">
                        Payment
                    </div>
                </Link>
                
                <Link to={'/home/user'} className="flex items-center pl-4">
                    <AccountBalanceIcon className="text-[#A3AED0]"/>
                    <div className="font-poppin pl-4 text-[#A3AED0] text-[14px] [line-height:30px] [letter-spacing:-0.32px]">
                        Manage User
                    </div>
                </Link>

                {user?.username === "admin" && <Link to={'/home/branch'} className="flex items-center pl-4">
                    <PersonIcon className="text-[#A3AED0]"/>
                    <div
                        className="font-poppin pl-4 text-[#A3AED0] text-[14px] [line-height:30px] [letter-spacing:-0.32px]">
                        Manage Branch
                    </div>
                </Link>}
                
                    <Link to={'/home/employee'} className="flex items-center pl-4">
                    <PersonIcon className="text-[#A3AED0]"/>
                    <div className="font-poppin pl-4 text-[#A3AED0] text-[14px] [line-height:30px] [letter-spacing:-0.32px]">
                        Employee
                    </div>
                    </Link>

                <div className="flex items-center pl-4">
                    <StickyNote2Icon className="text-[#A3AED0]"/>
                    <div className="font-poppin pl-4 text-[#A3AED0] text-[14px] [line-height:30px] [letter-spacing:-0.32px]">
                        Setting
                    </div>
                </div>
            </div>
            <div onClick={handleClick} className="absolute w-full flex items-center justify-center bottom-0">
                <button style={{
                    background: "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)",
                }} className="w-[184px] rounded-[24px] [padding:6px_5px_5px_4px;] font-dm text-[16px] text-white font-medium">
                    logout
                </button>
            </div>
        </div>
    );
};

export default SideBar;