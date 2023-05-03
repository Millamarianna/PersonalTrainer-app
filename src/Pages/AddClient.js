import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddClient(props) {

    const [open, setOpen] = React.useState(false);
    const [client, setClient] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });

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

    const saveClient = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
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

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add new client
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New client</DialogTitle>
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
                    <Button onClick={() => { handleClose(); saveClient(); }}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddClient;