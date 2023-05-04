import './App.css';
import AddClient from './AddClient';
import EditClient from './EditClient';
import DeleteClient from './DeleteClient';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';


function Clients() {
    const [clients, setClients] = useState([]);
    const gridRef = useRef();
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => {
                console.log(data.content);
                setClients(data.content);
            })
    }

    const columns = [
        { headerName: 'First name', field: 'firstname', sortable: true, filter: true, flex: 1, floatingFilter: true, resizable: true },
        { headerName: 'Last name', field: 'lastname', sortable: true, filter: true, flex: 1, floatingFilter: true, resizable: true },
        { headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true, flex: 1, floatingFilter: true, resizable: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, flex: 1, floatingFilter: true, type: 'numericColumn', resizable: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true, flex: 1, floatingFilter: true, resizable: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true, flex: 1, floatingFilter: true, resizable: true },
        { headerName: 'Phone number', field: 'phone', sortable: true, filter: true, flex: 1, floatingFilter: true, resizable: true },
        { headerName: '', suppressCsvExport: true, width: 90, cellRenderer: EditClient, cellRendererParams: { fetchData } },
        { headerName: '', width: 120, cellRenderer: DeleteClient, cellRendererParams: { fetchData } }
    ]


    const onBtnExport = useCallback(() => {
        const CsvExportParams = { columnKeys: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone'] }
        gridRef.current.api.exportDataAsCsv(CsvExportParams);
    }, []);

    return (
        <div className="ag-theme-material"
            style={{ height: '700px', width: '100%', margin: 'auto' }} >

            <AddClient fetchData={fetchData} />
            <Button variant="outlined" onClick={onBtnExport}>Download CSV export file</Button>

            <AgGridReact
                ref={gridRef}
                animateRows={true}
                rowSelection="single"
                columnDefs={columns}
                rowData={clients} />
        </div>

    );
};

export default Clients;