import React from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import useEffectOnce from '../../ReactEX'

import './daily_avg.css'
import { Grid } from '@mui/material'

function map_calc(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function MapPlot({ title }) {
    const [state, setState] = React.useState("loading")
    const [state2, setState2] = React.useState("loading")

    let countries = { "Austria": "AUT", "Belgia": "BEL", "Dania": "DNK", "Francja": "FRA", "Hiszpania": "ESP", "Holandia": "NLD", "Irlandia": "IRL", "Luksemburg": "LUX", "Niemcy": "DEU", "Polska": "POL", "Szwajcaria": "CHE", "Szwecja": "SWE", "Włochy": "ITA" }

    useEffectOnce(() => {
        let highest = 0
        let data = [{
            type: 'scattergeo',
            mode: 'markers',
            locations: [],
            hoverinfo: 'text',
            text: [],
            marker: {
                size: [],
                color: [],
                cmin: 0,
                cmax: 0,
                colorscale: 'Greens',
                colorbar: {
                    title: 'Amount',
                    // ticksuffix: '%',
                    showticksuffix: 'last'
                },
                line: {
                    color: 'black'
                }
            },
            name: 'europe data'
        }];
        let data2 = { x: [], y: [] }

        Object.keys(countries).forEach(country => {
            axios.get('http://34.141.144.103:8000/base/cby?country=' + country)
                .then((response) => {
                    data[0].locations.push(countries[country])
                    highest = highest < response.data.count ? response.data.count : highest
                    data[0].marker.size.push(response.data.count)
                    data[0].marker.color.push(response.data.count)
                    data[0].marker.cmax = response.data.total

                    data2.x.push(country)
                    data2.y.push(response.data.count)

                    if (data[0].marker.color.length === Object.keys(countries).length) {
                        // data2.y = data[0].marker.size
                        data[0].text = data2.y
                        data[0].marker.size.forEach((size, index) => {
                            data[0].marker.size[index] = map_calc(size, 0, highest, 5, 50)
                        })
                        // console.log(data[0].marker)
                        setState(data)
                        setState2(data2)
                    }
                });
        })
    })

    return (
        <Grid container spacing={{ xs: 1 }} columns={{ xs: 6, sm: 12 }}>
            <Grid item xs={12} sm={6}>
                <Plot data={state === "loading" ? [{ x: [0], y: [0] }] : state}
                    layout={{
                        autosize: true,
                        title: title[0],
                        'geo': {
                            'scope': 'europe',
                            'resolution': 50
                        }
                    }}
                    useResizeHandler className='daily_prices_plot'
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Plot data={state === "loading" ? [{ x: [0], y: [0] }] : [{
                    type: 'bar',
                    x: state2.x,
                    y: state2.y,
                }]} layout={{ autosize: true, title: title[1] }}
                useResizeHandler className='daily_prices_plot'
                />
            </Grid>
        </Grid>
    )
}

export default MapPlot