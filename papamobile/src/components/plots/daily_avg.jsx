import { React, useState } from 'react'
import useEffectOnce from '../../ReactEX'
import Plot from 'react-plotly.js'
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import './daily_avg.css'

function DailyAvgPlot({ type, title, api_props }) {
    const [state, setState] = useState("loading")

    const median = arr => {
        const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    useEffectOnce(() => {
        if (typeof api_props === 'undefined') {
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
                    setState([output])
                });
        } else {
            let detail = ''
            if (api_props.brand !== '') detail = detail + '?brand_d=' + api_props.brand
            if (api_props.model !== '') detail = detail + '&model_d=' + api_props.model
            if (api_props.year_since !== '') detail = detail + '&year_since_d=' + api_props.year_since
            if (api_props.year_till !== '') detail = detail + '&year_till_d=' + api_props.year_till

            axios.get('http://34.141.144.103:8000/base/daily_avg/detail' + detail)
                .then((response) => {
                    let temp = {}
                    let output = {
                        x: [],
                        y: [],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    }
                    response.data.forEach(element => {
                        if (temp.hasOwnProperty([element.added]) === false) {
                            // console.log(element.added)
                            temp = { ...temp, [element.added]: [element[type]] }
                        } else {
                            temp[element.added].push(element[type])
                        }
                    })
                    Object.keys(temp).forEach(added => {
                        output.x.push(added)
                        if (type === 'price') {
                            output.y.push(median(temp[added]))
                        } else if (type === 'count') {
                            output.y.push(temp[added].length)
                        }
                    })
                    //console.log(detail, output, temp)
                    setState([output])
                });
        }

    })

    return (
        <>
            {state === "loading" ?
                <CircularProgress style={{ 'marginTop': '25%' }} />
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