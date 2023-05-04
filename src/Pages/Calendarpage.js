import './App.css';
import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { startOfWeek } from 'date-fns';
import { getDay } from 'date-fns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";


function Calendarpage() {
    const [workouts, setWorkouts] = useState([]);
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setWorkouts(data);
            })
    }

    const locales = {
        "fi": require("date-fns/locale/fi")
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })


    const events = [];

    for (var i = 0; i < workouts.length; i++) {
        const endTime = new Date(workouts[i].date).getTime() + (workouts[i].duration * 60000);
        events.push({
            'title': workouts[i].activity + " / " + workouts[i].customer.firstname + " " + workouts[i].customer.lastname,
            'start': new Date(workouts[i].date),
            'end': new Date(endTime)
        })
    };

    const formats = {
        dateFormat: 'dd',
        dayHeaderFormat: 'dd.MM.',
        agendaDateFormat: 'dd.MM.',
        agendaTimeFormat: 'H:mm',
        dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dd.MM.', culture),


    }


    return (
        <div className="ag-theme-material"
            style={{ height: '700px', width: '100%', margin: 'auto' }} >


            <Calendar localizer={localizer} events={events} formats={formats} startAccessor="start" endAccessor="end"
                style={{ height: 680, margin: "10px" }} />
        </div>
    );
};

export default Calendarpage;