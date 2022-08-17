import { React, useState } from 'react'
import useEffectOnce from '../../ReactEX'
import Plot from 'react-plotly.js'
import axios from 'axios';
import './daily_prices.css'

function DailyPricesPlot() {
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
                    output.y.push(element.price)
                });
                // console.log(output)
                setState([output])
            });
    })

    return (
        <Plot data={state === "loading" ? [{
            x: [0],
            y: [0],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
        }] : state} layout={{ autosize: true, title: 'Daily median price' }}
            useResizeHandler
            className='daily_prices_plot'
        />
    )
}

export default DailyPricesPlot