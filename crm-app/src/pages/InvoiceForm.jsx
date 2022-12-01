import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const InvoiceForm = () => {


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
            fetch('http://localhost:8000/api/invoices/' + id, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .then (naviguate('/'))

        } else {
            fetch('http://localhost:8000/api/invoices', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .then (naviguate('/'))
        }
    }


    return ( 
        <Box component="form" sx={{display:"flex", gap:"20px", alignItems:"center" }}>
            <TextField id="outlined-basic" name="customer" label="Customer" variant="outlined" onChange={(e) => handleChange(e) } />
            <TextField id="outlined-basic" name="status" label="Status" variant="outlined" onChange={(e) => handleChange(e) } />
            <TextField id="outlined-basic" name="amount" label="amount" variant="outlined" onChange={(e) => handleChange(e) } />
            <Button variant="contained" onClick={(e)=> handleSubmit(e)}>{isEdit ? 'Update' : 'Create'}</Button>
        </Box>
     );
}
 
export default InvoiceForm;