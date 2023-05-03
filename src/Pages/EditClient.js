import React, { useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditClient(props) {

    const [open, setOpen] = React.useState(false);
    const [client, setClient] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const link = props.data.links[0].href;

    const defineRow = () => {
        console.log(link);
        fetch(link)
            .then(response => response.json())
            .then(rowdata => {
                console.log(rowdata);
                setClient(rowdata);
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        console.log(client);
        setClient({ ...client, [event.target.name]: event.target.value })
    };

    const editClient = () => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(client)
        })
            .then(response => {
                props.fetchData()
            })
            .catch(err => console.error(err))
    };




    return (<div>
        <Button variant="outlined" onClick={() => { defineRow(); handleClickOpen() }}>
            Edit
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit client information</DialogTitle>
            <DialogContent>
                <TextField margin="dense" name="firstname" value={client.firstname} onChange={event => handleInputChange(event)} label="First name" type="text" fullWidth />
                <TextField margin="dense" name="lastname" value={client.lastname} onChange={event => handleInputChange(event)} label="Last name" type="text" fullWidth />
                <TextField margin="dense" name="streetaddress" value={client.streetaddress} onChange={event => handleInputChange(event)} label="Street address" type="text" fullWidth />
                <TextField margin="dense" name="postcode" value={client.postcode} onChange={event => handleInputChange(event)} label="Postcode" type="text" fullWidth />
                <TextField margin="dense" name="city" value={client.city} onChange={event => handleInputChange(event)} label="City" type="text" fullWidth />
                <TextField margin="dense" name="email" value={client.email} onChange={event => handleInputChange(event)} label="Email" type="text" fullWidth />
                <TextField margin="dense" name="phone" value={client.phone} onChange={event => handleInputChange(event)} label="Phone" type="text" fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { handleClose(); editClient(); }}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </div>
    );
};

export default EditClient;

