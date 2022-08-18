import React from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import useEffectOnce from '../../ReactEX'

import CircularProgress from '@mui/material/CircularProgress';

function HeatPlot({ imports, brands, title }) {
    const [state, setState] = React.useState("loading")

    let data =
    {
        z: [],
        x: [],
        y: [],
        type: 'heatmap',
        hoverongaps: false
    }

    useEffectOnce(() => {
        data.y = imports
        imports.forEach((import_c, index_c) => {
            data.z.push([])
            brands.forEach((brand, index_b) => {
                axios.get('http://34.141.144.103:8000/base/ibb?brand=' + brand + '&import=' + import_c)
                    .then((response) => {
                        data.z[index_c][index_b] = response.data.count
                        if (data.x.length < brands.length) data.x.push(brand)
                        if (data.y.length === imports.length && data.x.length === brands.length && data.z[data.z.length - 1].length === brands.length) {
                            setState([data])
                        }
                    });
            })
        })
    })

    return (
        <>
            {state === "loading" ?
                <CircularProgress style={{'marginTop': '25%'}}/>
                :
                <Plot data={state} layout={{ title: title }} useResizeHandler className='daily_prices_plot' />
            }
        </>
    )
}

export default HeatPlot