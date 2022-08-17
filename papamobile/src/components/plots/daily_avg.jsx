import { React, useState } from 'react'
import useEffectOnce from '../../ReactEX'
import Plot from 'react-plotly.js'
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import './daily_avg.css'

function DailyAvgPlot({ type, title }) {
    const [state, setState] = useState("loading")

    useEffectOnce(() => {
        axios.get('http://34.141.144.103:8000/base/daily_avg?format=json')
            .then((response) => {
                let output = {
                    x: [],
                    y: [],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                }
                response.data.forEach(element => {
                    output.x.push(element.date)
                    output.y.push(element[type])
                });
                // console.log(output)
                setState([output])
            });
    })

    return (
        <>
            {state === "loading" ?
                <CircularProgress style={{'marginTop': '25%'}}/>
                :
                <Plot data={state === "loading" ? [{
                    x: [0],
                    y: [0],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'red' },
                }] : state} layout={{ autosize: true, title: title }}
                    useResizeHandler
                    className='daily_prices_plot'
                />
            }
        </>
    )
}

export default DailyAvgPlot