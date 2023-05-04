import './App.css';
import React, { useState, useEffect } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';


function Charts() {
    const _ = require('lodash');
    const [data, setData] = useState([]);
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            })
    }


      const activities = _.chain(data)
      .groupBy("activity")
      .map((value, key) => ({ activity: key, duration: _.sumBy(value, 'duration') }))
      .value();

      console.log(activities);

    return (
        <div>
<BarChart width={1000} height={500} data={activities}>
    <XAxis dataKey="activity" stroke="#8884d8" />
    <YAxis />
    <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
    <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <Bar dataKey="duration" fill="#8884d8" barSize={30} />
  </BarChart>
      
        </div>
    );
};

export default Charts;