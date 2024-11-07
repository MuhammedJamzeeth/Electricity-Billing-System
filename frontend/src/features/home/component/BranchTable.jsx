import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import useBranchHandler from "../../../hooks/useBranchHandler.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const BranchTable = () => {
    const { branch, loading, getAllBranch, deleteBranch, deleteRes } = useBranchHandler();
    const nav = useNavigate();

    useEffect(() => {
        getAllBranch().then()
    }, []);

    useEffect(() => {
        console.log(deleteRes)
        getAllBranch().then()
    }, [deleteRes]);


    if (loading) {
        return <div className="flex justify-center items-center">
            loading
        </div>
    }
    return (
        <div className="w-full px-12">
            <div className="flex w-full px-1 pb-3 items-end justify-end">
                <Button onClick={() => nav("/home/add-branch")} className="" variant="contained" color="primary">
                   <span className="text-sm">Add Branch</span>
                </Button>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' , borderRadius: "20px"}}>
                <TableContainer component={Paper} sx={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Branch Name</TableCell>
                                <TableCell align="center">Branch username</TableCell>
                                <TableCell align="center">Location</TableCell>
                                <TableCell align="center">Contact Number</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(branch) && branch.map((item) => (
                                <TableRow key={item.branchId} hover>
                                    <TableCell align="center">{item.branchId}</TableCell>
                                    <TableCell align="center">{item.branchName}</TableCell>
                                    <TableCell align="center">{item.branchUsername}</TableCell>
                                    <TableCell align="center">{item.location}</TableCell>
                                    <TableCell align="center">{item.contactNo}</TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => nav(`/home/edit-branch/${item.branchId}`)}>
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => deleteBranch(item.branchId)} sx={{ color: 'red' }}>
                                            <DeleteForeverOutlinedIcon sx={{ color: 'inherit' }} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default BranchTable;