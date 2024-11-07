import {Button} from "@mui/material";
import React, {useState} from "react";
import {handleInputChange} from "../../hooks/handleInputChange.js";
import useBranchHandler from "../../hooks/useBranchHandler.js";

const InitialState = {
    branchName: "",
    location: "",
    password: "",
    contactNo: ""
}

const AddBranch = () => {
    const [inputValues, setInputValues] = useState(InitialState)

    const {loading, addNewBranch, error} = useBranchHandler(inputValues)

    const handleSubmit = (e) => {
        e.preventDefault()
        addNewBranch().then()
        console.log(inputValues)
        console.log(error)
    }

    return (
        <div className="flex items-center mt-8 px-12 justify-center">
            <div className="flex w-full px-4 py-4 flex-col rounded-[20px] bg-white gap-2.5">
                <div className="text-[#2B3674] text-[22px]  font-bold font-dm">
                    Add New Branch
                </div>
                <div className="flex flex-col">
                    <label className="text-[#2B3674] font-dm font-medium ">Branch Name {error.branchName && <span
                        className="text-red-500 text-[11px]"> *{error.branchName}</span>}</label>
                    <input onChange={(e) => handleInputChange(e, setInputValues)} name="branchName" type="text" placeholder="Enter the branch name"
                           className="pl-2 placeholder:text-[14px] w-full h-[36px] border border-solid border-[#2E65F3] rounded-[8px]"/>
                </div>
                <div className="flex flex-col">
                    <label className="text-[#2B3674] font-dm font-medium">Location
                        {error.location && <span
                            className="text-red-500 text-[11px]"> *{error.location}</span>}
                    </label>
                    <input onChange={(e) => handleInputChange(e, setInputValues)} name="location" type="text" placeholder="Enter the location"
                           className="pl-2 placeholder:text-[14px] w-full h-[36px] border border-solid border-[#2E65F3] rounded-[8px]"/>
                </div>
                <div className="flex flex-col">
                    <label className="text-[#2B3674] font-dm font-medium ">Password
                        {error.password && <span
                            className="text-red-500 text-[11px]"> *{error.password}</span>}
                    </label>
                    <input onChange={(e) => handleInputChange(e, setInputValues)} type="password" name="password" placeholder="Enter the password"
                           className="pl-2 w-full h-[36px] placeholder:text-[14px] border border-solid border-[#2E65F3] rounded-[8px]"/>
                </div>
                <div className="flex flex-col">
                    <label className="text-[#2B3674] font-dm font-medium ">Contact Number
                        {error.contactNo && <span
                            className="text-red-500 text-[11px]"> *{error.contactNo}</span>}
                    </label>
                    <input  onChange={(e) => handleInputChange(e, setInputValues)} type="number" name="contactNo" placeholder="07X XXX XXXX"
                           className="pl-2 w-full h-[36px] text-[14px] border border-solid border-[#2E65F3] rounded-[8px]"/>
                </div>
                <div className="flex w-full px-1 pb-3 items-end justify-end">
                    <Button onClick={handleSubmit} className="" variant="contained" color="success">
                        <span className="text-sm">Submit</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddBranch;