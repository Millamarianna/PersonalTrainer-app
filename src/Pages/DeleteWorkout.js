import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';

function DeleteWorkout(props) {

    const id = props.data.id;

    const confirmDelete = () => {
        if (window.confirm("Are you sure you want to delete this workout?")) {
            deleteWorkout();
          } 
    }

    const deleteWorkout = () => {
        console.log(id);
        fetch("http://traineeapp.azurewebsites.net/api/trainings/" + id, { method: 'DELETE' })
            .then(res => props.fetchData())
            .catch(err => console.error(err))
    }

    return (
        <Button variant="outlined" onClick={confirmDelete}>Delete</Button>

    );
};

export default DeleteWorkout;
