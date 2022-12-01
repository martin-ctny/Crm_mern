import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActionsRowCustomer from "../components/table/ActionsRowCustomer";

const CustomerListePage = () => {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [columns, setColumns] = useState([
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'firstName', headerName: 'Prénom', width: 130 },
        { field: 'lastName', headerName: 'Nom', width: 130 },
        { field: 'invoices', headerName: 'Nombre de factures', width: 150,
        valueGetter: (params) => `${params.row.invoices.length}` },
        { 
            headerName: 'Actions', width: 300,
            renderCell: (params) => <ActionsRowCustomer params={params}  setCustomers={setCustomers} customers={customers}/>
         },
    ]);

    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = async () => {
        fetch("http://localhost:8000/api/customers")
            .then(response => response.json())
            .then(data => setCustomers(data));
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log(search);
    }

    const filteredCustomers = customers.filter(customer =>
        customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(search.toLowerCase())
    )

    return ( 
        <Box>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Typography variant="h2">Liste des clients</Typography>
            <Link to="/customers/addCustomer">
            <Button variant="contained">Nouveaux client</Button>
            </Link>
        </Box>
        <Box component="form">
            <TextField 
                variant="outlined" 
                label="Recherche" 
                sx={{width: "100%"}}
                onChange={handleSearch}
            />
        </Box>
        <Box
            sx={{
                height: 400, 
                width: '100%',
                mt: 4
            }}
        >
            <DataGrid
                rows={filteredCustomers}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                getRowId={(row) => row._id}
            />
        </Box>
    </Box>
     );
}
 
export default CustomerListePage;