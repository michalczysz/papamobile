import React from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import useEffectOnce from '../../ReactEX'

import CircularProgress from '@mui/material/CircularProgress';

function Medians({ field, search, title, annotations, api_props, general = false}) {
    const [state, setState] = React.useState("loading")
    let output = { x: [], y: [] }

    useEffectOnce(() => {
        let detail = ''
        let plots = general === false ? '' : '/plots'
        if (typeof api_props !== 'undefined') {
            if (api_props.brand !== '') detail = detail + '&brand_d=' + api_props.brand
            if (api_props.model !== '') detail = detail + '&model_d=' + api_props.model
            if (api_props.year_since !== '') detail = detail + '&year_since_d=' + api_props.year_since
            if (api_props.year_till !== '') detail = detail + '&year_till_d=' + api_props.year_till
        }
        search.forEach(searching => {
            axios.get('http://34.141.144.103:8000/base/user_search' + plots + '?field=' + field + '&search=' + searching + detail)
                .then((response) => {
                    output.x.push(searching)
                    output.y.push(response.data.median)
                    if (output.x.length === search.length) {
                        setState({ x: output.x, y: output.y })
                    }
                });
        }
        )
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
                }] : [{
                    type: 'bar',
                    x: state.x,
                    y: state.y,
                    transforms: [{
                        type: 'sort',
                        target: 'y',
                        order: 'descending'
                    }]
                }]} layout={{
                    title: title,
                    annotations: [{
                        xref: 'paper',
                        yref: 'paper',
                        x: 0,
                        xanchor: 'right',
                        y: 1,
                        yanchor: 'bottom',
                        text: annotations.y,
                        showarrow: false
                    }, {
                        xref: 'paper',
                        yref: 'paper',
                        x: 1,
                        xanchor: 'left',
                        y: 0,
                        yanchor: 'top',
                        text: annotations.x,
                        showarrow: false
                    }]
                }}
                    useResizeHandler
                    className='daily_prices_plot'
                />
            }
        </>
    )
}

export default Medians