import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from '@mui/material/FormHelperText';

function AddWorkout(props) {

    const [open, setOpen] = React.useState(false);
    const [workout, setWorkout] = useState({ date: '', duration: '', activity: '', customer: '' });
    const [date, setDate] = useState(dayjs());
    const [clients, setClients] = useState([]);

    const fetchClients = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => {
                console.log(data.content);
                setClients(data.content);
            })
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {

        setWorkout({ ...workout, [event.target.name]: event.target.value })
    };

    const saveWorkout = () => {
        console.log(workout);
        fetch('http://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(workout)
        })
            .then(response => {
                props.fetchData()
            })
            .catch(err => console.error(err))
    };

    return (
        <div>

            <Button variant="outlined" onClick={() => { handleClickOpen(); fetchClients(); }}>
                Add new workout
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New workout</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                        <DateTimePicker format="DD.MM.YYYY, hh:mm" value={date} onChange={(newDate) => { setWorkout({ ...workout, 'date': newDate }) }} />
                    </LocalizationProvider>
                    <TextField margin="dense" name="activity" value={workout.activity} onChange={event => handleInputChange(event)} label="Activity" type="text" fullWidth />
                    <TextField margin="dense" name="duration" value={workout.duration} onChange={event => handleInputChange(event)} label="Duration" type="text" fullWidth />

                    <InputLabel id="demo-multiple-name-label">Client's name</InputLabel>
                    <FormControl>
                        <Select
                            labelId="client"
                            name="customer"
                            id="customer"
                            value={workout.customer}
                            input={<OutlinedInput label="Client's name" />}
                            onChange={handleInputChange}
                        >
                            {clients.map((option) => (
                                <MenuItem key={option.links[0].href} value={option.links[0].href}>
                                    {option.firstname} {option.lastname}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Select client from the list</FormHelperText>
                    </FormControl>


                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(); saveWorkout(); }}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddWorkout;