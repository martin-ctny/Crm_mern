import { Box, Button, TextField, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ActionsRow from "../components/table/ActionsRow";
import CreatedAtRow from "../components/table/CreatedAtRow";
import StatusRow from "../components/table/StatusRow";

const InvoiceListePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [search, setSearch] = useState("");
    const [columns, setColumns] = useState([
        { field: '_id', headerName: 'ID', width: 200 },
        { 
            field: 'customer', headerName: 'Client', width: 130,
            valueGetter: (params) => 
                `${params.row.customer?.firstname} ${params.row.customer?.lastname}`
        },
        { 
            field: 'createdAt', headerName: 'Date d\'envoie', width: 130,
            renderCell: (params) => <CreatedAtRow params={params} />
         },
        { 
            field: 'status', headerName: 'Status', width: 90,
            renderCell: (params) => <StatusRow params={params} />
        },
        { 
            field: 'amount', headerName: 'Montant', width: 160,
            valueGetter: (params) => `${params.value} €`,
         },
        { 
            headerName: 'Actions', width: 300,
            renderCell: (params) => <ActionsRow params={params}  setInvoices={setInvoices} invoices={invoices}/>
         },
    ]);

    useEffect(() => {
        fetchInvoices();
    }, [])

    const fetchInvoices = async () => {
        fetch("http://localhost:8000/api/invoices")
            .then(response => response.json())
            .then(data => setInvoices(data));
    }
    const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log(search);
    }
    const filteredInvoices = invoices.filter(invoice =>
        invoice.status.toLowerCase().includes(search.toLowerCase())  ||
        invoice.amount.toString().toLowerCase().includes(search.toLowerCase())
          )

    return ( 
        <Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Typography variant="h2">Liste des factures</Typography>
                <Link to="/invoices/addInvoice">
                <Button variant="contained">Nouvelle facture</Button>
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
                    rows={filteredInvoices}
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
 
export default InvoiceListePage;