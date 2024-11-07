import {Button} from "@mui/material";
import React from "react";

const AddBranch = () => {
    return (
        <div className="flex items-center mt-8 px-12 justify-center">
            <div className="flex w-full px-4 py-4 flex-col rounded-[20px] bg-white gap-2.5">
                <div className="text-[#2B3674] text-[22px]  font-bold font-dm">
                    Add New Branch
                </div>
                <div className="flex flex-col">
                    <label className="text-[#2B3674] font-dm font-medium tect-[12px]">Branch Name</label>
                    <input name="branchName" type="text" placeholder="Enter the branch name"
                           className="placeholder:pl-2 placeholder:text-[14px] w-full h-[36px] border border-solid border-[#2E65F3] rounded-[8px]"/>
                </div>
                <div className="flex flex-col">
                    <label className="text-[#2B3674] font-dm font-medium tect-[12px]">Location</label>
                    <input name="" type="text" placeholder="Enter the location"
                           className="placeholder:pl-2 placeholder:text-[14px] w-full h-[36px] border border-solid border-[#2E65F3] rounded-[8px]"/>
                </div>
                <div className="flex flex-col">
                    <label className="text-[#2B3674] font-dm font-medium tect-[12px]">Password</label>
                    <input placeholder="Enter the password"
                           className="placeholder:pl-2 w-full h-[36px] placeholder:text-[14px] border border-solid border-[#2E65F3] rounded-[8px]"/>
                </div>
                <div className="flex flex-col">
                    <label className="text-[#2B3674] font-dm font-medium tect-[12px]">Contact Number</label>
                    <input placeholder="Enter the contact number"
                           className="placeholder:pl-2 w-full h-[36px] placeholder:text-[14px] border border-solid border-[#2E65F3] rounded-[8px]"/>
                </div>
                <div className="flex w-full px-1 pb-3 items-end justify-end">
                    <Button onClick={() => nav("/home/add-branch")} className="" variant="contained" color="success">
                        <span className="text-sm">Submit</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddBranch;