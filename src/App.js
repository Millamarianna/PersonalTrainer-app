import './Pages/App.css';
import Home from './Pages/Home';
import Clients from './Pages/Clients';
import Workouts from './Pages/Workouts';
import Calendarpage from './Pages/Calendarpage';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Container from '@mui/material/Container';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



function App() {

  return (
    <Container maxWidth="lg">
      <BrowserRouter>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6">
              <Link to="/">Home |</Link>{' '}
              <Link to="/workouts">Workout List |</Link>{' '}
              <Link to="/calendarpage">Workout calendar |</Link>{' '}
              <Link to="/clients">Client list</Link>{' '}
              
            </Typography>
          </Toolbar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/calendarpage" element={<Calendarpage />} />
          </Routes>
        </AppBar>

      </BrowserRouter>
    </Container>
  );
}

export default App;
