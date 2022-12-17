import React, { useState } from 'react';
import { LineChart, Tooltip, XAxis, Line, CartesianGrid, YAxis, ResponsiveContainer } from 'recharts'
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'
function DisplayAverages(props) {
    let loggedkm = 0;
    let totalcosts = 0;
    let totalliters = 0;
    props.refuels.forEach(refuel => {
        loggedkm = loggedkm + Number(refuel.kmsincerefuel);
        totalcosts = totalcosts + Math.round(refuel.price * refuel.liters);
        totalliters = totalliters + refuel.liters;
    });
    let averageconsumption = Math.round(totalliters / loggedkm * 1000) / 10
    //Chart
    const [chart, setChart] = useState('price');
    const handleChange = (event) => {
        setChart(event.target.value)
    }
    return (
        <Box>

            <h2>Stats: </h2>
            <p>Logged kilometers: {loggedkm} km</p>
            <p>Total cost: {totalcosts}€</p>
            <p>Average consumption:  {averageconsumption}L/km</p>
            <FormControl sx={{ width: 250 }}>
                <InputLabel id="demo-simple-select-label">Chart</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue='price'
                    value={chart}
                    label="Age"
                    autoWidth
                    onChange={handleChange}
                >
                    <MenuItem value={'price'}>Price (€)</MenuItem>
                    <MenuItem value={'consumption'}>Consumption (l/100km)</MenuItem>
                    <MenuItem value={'km'}>Odometer (km)</MenuItem>
                </Select>
            </FormControl>
            <div style={{width: '70%', height: '400px'}}>
            <ResponsiveContainer>
            <LineChart
                data={props.refuels}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >

                <XAxis dataKey="date" />
                <YAxis dataKey={chart} />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey={chart} stroke="#757de8" yAxisId={0} />
            </LineChart>
            </ResponsiveContainer>
            </div>
        </Box>
    )

}
export default DisplayAverages;
