import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const useAuthHandler = (values) => {
    const [error, setError] = useState({})
    const nav = useNavigate();

    const handleLogin = async () => {
        console.log(values);
        let isError = false;
        setError({});
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!values.branch) {
            setError((prev) => ({...prev, branch: 'Branch is required'}));
            isError = true;
        }
        if (!values.username) {
            setError((prev) => ({...prev, email: 'Username is required'}));
            isError = true;
        }
        if (!values.password) {
            setError((prev) =>  ({...prev, password: 'Password is required'}));
            isError = true;
        }

        if (isError) {
            return;
        }


        try {
            const response = await axios.post('http://localhost:8081/auth/login', values);
            console.log(response);
            if (response.status === 200) {
                nav('/home');
            }
        } catch (error) {
            console.log(error.response.data.Description);
            setError((prev) => ({...prev, api: error.response.data.Description && error.response.data.Description}));
        }

    }

    return {
        handleLogin,
        error
    }
};

export default useAuthHandler;