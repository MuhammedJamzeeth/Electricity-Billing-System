import {Outlet} from "react-router-dom";
import image from "../../lib/image.js";

const AuthLayout = () => {
    return (
            <main className="flex w-full bg-white h-full">
                <Outlet />
                <section style={{
                    background: "linear-gradient(180deg, #868CFF 0%, #4318FF 100%)"
                }} className="flex flex-col items-center justify-center w-[834px] h-screen rounded-bl-[100px]">

                    <img src={image.Bulb || ""} alt={"bulb"}/>
                    <div className="font-poppin text-[#B3B7FA] font-bold  text-[80px]">Group 07</div>

                </section>
            </main>

            );
};

export default AuthLayout;