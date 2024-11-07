import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const useBranchHandler = (data) => {
    const [loading, setLoading] = useState(false)
    const [branch, setBranch] = useState([])
    const [error, setError] = useState({})
    const nav = useNavigate()
    const [deleteRes, setDeleteRes] = useState()

    const addNewBranch = async () => {
        try {
            setLoading(true)
            setError({})
            let isError = false;

            if (!data.branchName){
                setError((prev) => ({
                    ...prev,
                    branchName: "Branch name required"
                }))
                isError = true
            }
            if (!data.location){
                setError((prev) => ({
                    ...prev,
                    location: "Location required"
                }))
                isError = true
            }
            if(!data.password){
                setError((prev) => (
                    {
                        ...prev,
                        password: "Password Required"
                    }
                ))
                isError = true
            }
            if(!data.contactNo){
                setError((prev) => (
                    {
                        ...prev,
                        contactNo: "Contact Number Required"
                    }
                ))
                isError = true
            }

            if (isError){
                return
            }

            const response = await axios.post('http://localhost:8081/branch/add',data);
            console.log(response)
            nav("/home/branch")
            return response;
        }catch (e){
            console.log(e.response.data)
            if (e.response.data.Status === "409 CONFLICT"){
                setError((prev) => ({
                    ...prev,
                    branchName: "Branch Name already exits"
                }))
            }
        }finally {
            setLoading(false)
        }
    }

    const getBranchById = async (id) => {

        try{
            const response = await axios.get(`http://localhost:8081/branch/${id}`)
            console.log(response.data)
            return response.data;

        }catch (e) {
            console.error(e)
        }
    }

    const getAllBranch = async () => {
        try{
            setLoading(true)
            const response = await axios.get('http://localhost:8081/branch');
            if (response.data){
                setBranch(response.data)
                console.log(response.data)
            }
        }catch (error){
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const updateBranch = async (id) => {

        setError({})

        let isError = false;

        if (!data.branchName){
            setError((prev) => ({
                ...prev,
                branchName: "Branch name required"
            }))
            isError = true
        }
        if (!data.location){
            setError((prev) => ({
                ...prev,
                location: "Location required"
            }))
            isError = true
        }
        if(!data.contactNo){
            setError((prev) => (
                {
                    ...prev,
                    contactNo: "Contact Number Required"
                }
            ))
            isError = true
        }

        if (isError){
            return
        }
        try{

            const response = await axios.put(`http://localhost:8081/branch/update/${id}`,
                data
            )
            console.log(response)
            if(response.status === 200){
                nav("/home/branch")
            }

            return response

        }catch (e){
            console.log(e)
        }
    }

    const deleteBranch = async (id) => {
        try{
            const response =  await axios.delete(`http://localhost:8081/branch/delete/${id}`)
            console.log(response)
            if (response.status === 200) {
                setDeleteRes(response)
                return response
            }

        }catch (e){
            console.log(e)
        }

    }

    return {
        getBranchById,
        error,
        deleteRes,
        deleteBranch,
        addNewBranch,
        branch,
        getAllBranch,
        loading,
        updateBranch
    }
};

export default useBranchHandler;