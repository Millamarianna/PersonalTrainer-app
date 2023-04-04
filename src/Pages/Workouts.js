import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { format } from 'date-fns';


function Workouts() {
    const [workouts, setWorkouts] = useState([]);
    const gridRef = useRef();
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setWorkouts(data);
            })
    }

    const dateFormatter = () => {
        return format(new Date(), 'dd.MM.yyyy, hh:mm');
    };


    const columns = [
        { headerName: 'First name', field: 'customer.firstname', sortable: true, filter: true, flex: '1', floatingFilter: true, resizable: true },
        { headerName: 'Last name', field: 'customer.lastname', sortable: true, filter: true, flex: '1', floatingFilter: true, resizable: true },
        { headerName: 'Date, time', field: 'date', sortable: true, filter: true, flex: '1', floatingFilter: true, resizable: true, valueFormatter: dateFormatter },
        { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true, flex: '1', floatingFilter: true, resizable: true },
        { field: 'activity', sortable: true, filter: true, flex: '1', floatingFilter: true, resizable: true }
    ]


    return (
         <div className="ag-theme-material"
                style={{ height: '700px', width: '100%', margin: 'auto' }} >

                <AgGridReact
                    ref={gridRef}
                    animateRows={true}
                    rowSelection="single"
                    columnDefs={columns}
                    rowData={workouts} />
            </div>
    );
};

export default Workouts;