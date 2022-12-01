import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomerForm = () => {
    
    const [credentials, setCredentials] = useState({});
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState( id ? true : false )
    const naviguate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({...credentials, [name]: value});
        console.log(credentials);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            fetch('http://localhost:8000/api/customers/' + id, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .then (naviguate('/customers'))

        } else {
            fetch('http://localhost:8000/api/customers', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .then (window.location.href = '/customers')
        }
    }

    return ( 
        <Box component="form" sx={{display:"flex", gap:"20px", alignItems:"center" }}>
            <TextField id="outlined-basic" name="firstName" label="First name" variant="outlined" onChange={(e) => handleChange(e) } />
            <TextField id="outlined-basic" name="lastName" label="Last Name" variant="outlined" onChange={(e) => handleChange(e) } />
            <TextField id="outlined-basic" name="user" label="User" variant="outlined" onChange={(e) => handleChange(e) } />
            <Button variant="contained" onClick={(e)=> handleSubmit(e)}>{isEdit ? 'Update' : 'Create'}</Button>
        </Box>
     );
}
 
export default CustomerForm;