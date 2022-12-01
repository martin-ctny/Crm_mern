import { Box, Button } from "@mui/material";
import { Link, Navigate } from "react-router-dom";

const ActionsRow = ({params,setInvoices, invoices}) => {

    const handleDelete = (e) => {
        e.stopPropagation()
        console.log("Delete", params.row._id);
        fetch(`http://localhost:8000/api/invoices/${params.row._id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            .then(res => res.json())
            .then(data => {
                fetch('http://localhost:8000/api/invoices')
                    .then(res => res.json())
                    .then(data => {
                        setInvoices(data)
                    }
                    )
            })
    }

    // Delete
    // fetch delete request
    // refresh data

    return ( 
        <Box display="flex" justifyContent="space-around">
            <Link to={`/invoices/edit/${params.row._id}`}>
            <Button variant="contained" color="primary" size="small" >
                Editer
            </Button>
            </Link>
            <Button variant="contained" color="secondary" size="small" sx={{ml: 2}} onClick={handleDelete}>
                Supprimer
            </Button>
        </Box>
     );
}
 
export default ActionsRow;