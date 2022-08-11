import React from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import { Grid } from '@mui/material'
import './general-page.css'

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

function Test({ state, setState }) {
    if (state === "loading") {
        axios.get('http://34.141.144.103:8000/base/mbrand?format=json')
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
                setState(data)
            });
    }

    return (
        <div className='General'>
            <Grid container spacing={{ xs: 1 }} columns={{ xs: 6, sm: 12 }}>
                <Grid item xs={6}>
                    <Plot data={state === "loading" ? [{
                        values: [0],
                        labels: ['none'],
                        type: 'pie'
                    }] : state} layout={{ title: 'Most popular brands' }} />
                </Grid>
                <Grid item xs={6}>
                    <Plot data={[
                        {
                            x: [1, 2, 3],
                            y: [2, 6, 3],
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },
                        { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },

                    ]} layout={{ title: 'Second graph Audi' }} />
                </Grid>
                <Grid item xs={12} align="center">
                    <Plot data={state === "loading" ? [{
                        values: [0],
                        labels: ['none'],
                        type: 'pie'
                    }] : state} layout={{ title: 'Most popular brands' }} />
                </Grid>
                <Grid item xs={6}>
                    <Plot data={state === "loading" ? [{
                        values: [0],
                        labels: ['none'],
                        type: 'pie'
                    }] : state} layout={{ title: 'Most popular brands' }} />
                </Grid>
                <Grid item xs={6}>
                    <Plot data={state === "loading" ? [{
                        values: [0],
                        labels: ['none'],
                        type: 'pie'
                    }] : state} layout={{ title: 'Most popular brands' }} />
                </Grid>
                <Grid item xs={6} >
                    <Plot data={state === "loading" ? [{
                        values: [0],
                        labels: ['none'],
                        type: 'pie'
                    }] : state} layout={{ title: 'Most popular brands' }} />
                </Grid>

            </Grid>

        </div>
    )
}

export default Test