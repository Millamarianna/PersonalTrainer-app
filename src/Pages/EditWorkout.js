import React, { useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function EditWorkout(props) {

    const [open, setOpen] = React.useState(false);
    const [workout, setWorkout] = useState({ date: '', duration: '', activity: '' });
    const [date, setDate] = useState('');
    const id = props.value;

    const defineRow = () => {
        console.log(id);
        fetch("http://traineeapp.azurewebsites.net/api/trainings/" + id)
            .then(response => response.json())
            .then(rowdata => {
                console.log(rowdata);
                setWorkout(rowdata);
                setDate(dayjs(rowdata.date));
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        console.log(workout);
        setWorkout({ ...workout, [event.target.name]: event.target.value })
    };

    const editClient = () => {
        fetch("http://traineeapp.azurewebsites.net/api/trainings/" + id, {
            method: 'PUT',
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
            <Button variant="outlined" onClick={() => { defineRow(); handleClickOpen() }}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit workout details</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs} dateLibInstance={dayjs.utc}>
                        <DateTimePicker format="DD.MM.YYYY, hh:mm" value={date} onChange={(newDate) => { setWorkout({ ...workout, 'date': newDate }) }} />
                    </LocalizationProvider>
                    <TextField margin="dense" name="duration" value={workout.duration} onChange={event => handleInputChange(event)} label="Duration (min)" type="text" fullWidth />
                    <TextField margin="dense" name="activity" value={workout.activity} onChange={event => handleInputChange(event)} label="Activity" type="text" fullWidth />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(); editClient(); }}>Save</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditWorkout;

