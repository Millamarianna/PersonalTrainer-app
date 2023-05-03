import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';

function DeleteClient(props) {

    const confirmDelete = () => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            deleteClient();
          } 
    }

    const link = props.data.links[0].href;

    const deleteClient = () => {
        console.log(link);
        fetch(link, { method: 'DELETE' })
            .then(res => props.fetchData())
            .catch(err => console.error(err))
    }

    return (
        <Button variant="outlined" onClick={confirmDelete}>Delete</Button>

    );
};

export default DeleteClient;
