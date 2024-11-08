import {Box, Button, Checkbox, FormControl, InputLabel, MenuItem, TextField, Typography} from "@mui/material";
import Select from '@mui/material/Select';
import {useEffect, useState} from "react";
import {handleInputChange} from "../../hooks/handleInputChange.js";
import useAuthHandler from "../../hooks/useAuthHandler.js";
import useBranchHandler from "../../hooks/useBranchHandler.js";

const SignInState = {
    username: "",
    password: "",
    branch: "",
}

const SignIn = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [inputValues, setInputValues] = useState(SignInState)
    const {error, handleLogin} = useAuthHandler(inputValues);

    const {branch,getAllBranch} = useBranchHandler()

    useEffect(() => {
        getAllBranch().then()
        console.log(branch)
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin().then()
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            handleSubmit();
        }
    };

    return (
        <div className="flex w-full items-center justify-center">
            <div className="flex w-[410px] flex-col">
                <div className="flex flex-col font-dm">
                    <div className="text-[#2B3674] text-[36px] font-bold [letter-spacing:-0.72px]">Branch Login</div>
                    <div className="text-[16px] font-[400px] text-[#A3AED0]">Enter your email and password to log in!
                    </div>
                </div>
                <div className="w-full mt-2 h-px bg-[#E0E5F2]"></div>
                {error.api && <div className="font-dm text-sm text-red-500">
                    {error.api}
                </div>}
                <form onSubmit={handleSubmit}
                      onKeyDown={handleKeyDown}
                      className="flex flex-col mt-6 gap-6">
                    <Box className="w-full min-h-[50px] pr-24" sx={{
                        minHeight: "50px",
                    }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Your Branch</InputLabel>
                            <Select
                                error={!!error.branch}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="branch"
                                value={inputValues.branch}
                                label="Select Your Branch"
                                onChange={(e) => handleInputChange(e, setInputValues)}
                            >
                                <MenuItem value={"admin"}>Admin</MenuItem>

                                {Array.isArray(branch) && branch.map((item) => (
                                    <MenuItem value={item.location} key={item.location}>{item.location}</MenuItem>
                                ))}

                            </Select>
                            {error.branch && <Typography sx={{
                                fontSize: "12px",
                                paddingLeft: "14px",
                                paddingTop: "4px",
                            }} color="error">Please select a branch.</Typography>}
                        </FormControl>
                    </Box>

                    <Box
                        component="form"
                        className="flex flex-col gap-4"
                        sx={{
                            '& > :not(style)': {width: '100%', borderRadius: "12px"}, '& .MuiOutlinedInput-root': {
                                borderRadius: '6px',
                            },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            error={!!error.email}
                            name="username"
                            onChange={(e) => handleInputChange(e, setInputValues)}
                            id="outlined-basic" value={inputValues.username}
                            label="Username"
                            variant="outlined"
                            helperText={error.email ? error.email : ""}
                        />
                        <TextField
                            error={!!error.password}
                            type="password" name="password"
                            onChange={(e) => handleInputChange(e, setInputValues)}
                            id="outlined-basic" value={inputValues.password}
                            label="Password"
                            variant="outlined"
                            helperText={error.password ? error.password : ""}
                        />
                    </Box>

                    <Button type="submit" variant="contained">Login</Button>

                    <div className="flex items-center">
                        <div className="self-start">
                            <Checkbox {...label} defaultChecked/>
                        </div>
                        <div className="text-[16px] font-[400px] text-neutral-600">
                            Keep logged in.
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SignIn;