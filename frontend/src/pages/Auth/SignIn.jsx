import {Box, Button, Checkbox, FormControl, InputLabel, MenuItem, TextField} from "@mui/material";
import Select from '@mui/material/Select';
import {useState} from "react";

const SignIn = () => {
    const [age, setAge] = useState('');
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className="flex w-full items-center justify-center">
            <div className="flex w-[410px] flex-col">
                <div className="flex flex-col font-dm">
                    <div className="text-[#2B3674]  text-[36px] font-bold [letter-spacing:-0.72px]">Branch Login</div>
                    <div className="text-[16px] font-[400px] text-[#A3AED0]">Enter your email and password to log in!
                    </div>
                </div>
                <div className="w-full mt-2 h-px bg-[#E0E5F2]"></div>
                <form className="flex flex-col mt-6 gap-6">
                    <Box className="w-full min-h-[50px] pr-4" sx={{
                        minHeight: "50px",
                    }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Your Branch</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Select Your Branch"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        component="form"
                        className="flex flex-col gap-4"
                        sx={{ '& > :not(style)': { width: '100%', borderRadius: "12px" }, '& .MuiOutlinedInput-root': {
                                borderRadius: '6px',
                            },}}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Email" variant="outlined" />
                        <TextField id="outlined-basic" label="Password" variant="outlined" />
                    </Box>
                    <Button variant="contained">Login</Button>
                    <div className="flex items-center">
                        <div className="self-start">
                            <Checkbox {...label} defaultChecked/>
                        </div>
                        <div className="text-[16px] font-[400px] text-[#A3AED0]">
                            Enter your email and password to log in!
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;