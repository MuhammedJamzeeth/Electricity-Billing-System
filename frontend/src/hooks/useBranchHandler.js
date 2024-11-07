import {useState} from "react";
import axios from "axios";

const useBranchHandler = () => {
    const [loading, setLoading] = useState(false)
    const [branch, setBranch] = useState([])

    const getAllBranch = async () => {
        try{
            setLoading(true)
            const response = await axios.get('http://localhost:8081/branch');
            if (response.data){
                setBranch(response.data)
            }
        }catch (error){
            console.log(error)
        }finally {
            setLoading(false)
        }
    }
    return {
        branch,
        getAllBranch,
        loading
    }
};

export default useBranchHandler;