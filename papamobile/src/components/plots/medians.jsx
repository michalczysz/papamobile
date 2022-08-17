import React from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import useEffectOnce from '../../ReactEX'

import CircularProgress from '@mui/material/CircularProgress';

function Medians({ field, search, title }) {
    const [state, setState] = React.useState("loading")
    let output = { x: [], y: [] }

    useEffectOnce(() => {        //setState( { x: [], y: [] } )
        search.forEach(searching => {
            axios.get('http://34.141.144.103:8000/base/user_search?field=' + field + '&search=' + searching)
                .then((response) => {
                    output.x.push(searching)
                    output.y.push(response.data.median)
                    //console.log(response.data.median + ' ' + searching, output)
                    //setState( { x: state.x.concat(color), y: state.y.concat(response.data.median) } )
                    if (output.x.length === search.length) {
                        setState({ x: output.x, y: output.y })
                    }
                });
        }
        )
    })


    return (
        <>
            {state === "loading" ?
                <CircularProgress style={{ 'marginTop': '25%' }} />
                :
                <Plot data={state === "loading" ? [{
                    values: [0],
                    labels: ['none'],
                    type: 'pie'
                }] : [{
                    type: 'bar',
                    x: state.x,
                    y: state.y,
                    //...(field === 'color' && {
                    transforms: [{
                        type: 'sort',
                        target: 'y',
                        order: 'descending'
                    }]
                    //})
                }]} layout={{ title: title }}
                    useResizeHandler
                    className='daily_prices_plot'
                />
            }
        </>
    )
}

export default Medians