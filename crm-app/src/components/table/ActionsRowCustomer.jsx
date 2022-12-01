import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const ActionsRowCustomer = ({params, setCustomers, customers}) => {

    const handleDelete = (e) => {
        e.stopPropagation()
        console.log("Delete", params.row._id);
        fetch(`http://localhost:8000/api/customers/${params.row._id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            .then(res => res.json())
            .then(data => {
                fetch('http://localhost:8000/api/customers')
                    .then(res => res.json())
                    .then(data => {
                        setCustomers(data)
                    }
                    )
            })
    }



    return ( 
        <Box display="flex" justifyContent="space-around">
            <Link to={`/customers/edit/${params.row._id}`}>
            <Button variant="contained" color="primary" size="small" >
                Editer
            </Button>
            </Link>
            <Button variant="contained" color="secondary" size="small" sx={{ml: 2}} onClick={(e)=> handleDelete(e)}>
                Supprimer
            </Button>
        </Box>
     );
}
 
export default ActionsRowCustomer;