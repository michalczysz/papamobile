import { React, useState } from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import useEffectOnce from '../../ReactEX'

import './daily_avg.css'
import CircularProgress from '@mui/material/CircularProgress';

function compare(a, b) {
    const bandA = a.count;
    const bandB = b.count;

    let comparison = 0;
    if (bandA < bandB) {
        comparison = 1;
    } else if (bandA > bandB) {
        comparison = -1;
    }
    return comparison;
}

function MostCommonData(api_props) {
    return axios.get('http://34.141.144.103:8000/base/mbrand' + api_props)
        .then((response) => {
            let data = [{
                values: [],
                labels: [],
                type: 'pie'
            }];
            let datas = response.data
            datas.sort(compare)
            datas.slice(0, 9).forEach(element => {
                data[0].labels.push(element.brand)
                data[0].values.push(element.count)
            });
            data[0].labels.push('other')
            data[0].values.push(0)
            datas.slice(10, datas.length).forEach(element => {
                data[0].values[data[0].values.length - 1] += element.count
            });
            return data
        });
}

function MostCommonPlot({ api_props }) {
    const [state, setState] = useState("loading")

    useEffectOnce(() => {
        MostCommonData(api_props).then(results => {
            setState(results);
        });
    }, [api_props])

    return (
        <>
            {state === "loading" ?
                <CircularProgress style={{ 'marginTop': '25%' }} />
                :
                <Plot data={state === "loading" ? [{
                    values: [0],
                    labels: ['none'],
                    type: 'pie'
                }] : state} layout={{ autosize: true, title: 'Most popular brands' }} useResizeHandler className='daily_prices_plot' />
            }
        </>
    )
}
export default MostCommonPlot