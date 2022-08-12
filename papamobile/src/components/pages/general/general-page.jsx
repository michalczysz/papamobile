import React from 'react'
import Plot from 'react-plotly.js';
import { Grid } from '@mui/material'
import './general-page.css'

import MostCommonPlot from "../../plots/most_common_brands"
import Medians from "../../plots/medians"


function Test({ state, setState }) {
    let plot3 = "loading" 
    let plot4 = "loading" 
    let plot5 = "loading" 
    return (
        <div className='General'>
            <Grid container spacing={{ xs: 1 }} columns={{ xs: 6, sm: 12 }}>
                <Grid item xs={6}>
                    <MostCommonPlot/>
                </Grid>
                <Grid item xs={6}>
                    <Medians field={'fuel'} search={['Benzyna', 'Diesel', 'Elektryczny', 'Hybryda']} title={'Median Price/Fuel'}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <Medians field={'color'} search={['Czarny', 'Czerwony', 'Szary', 'Niebieski', 'Srebrny', 'Biały', 'Inny kolor']} title={'Median Price/Color'}/>
                </Grid>
                <Grid item xs={6}>
                    <Plot data={plot3 === "loading" ? [{
                        values: [0],
                        labels: ['none'],
                        type: 'pie'
                    }] : plot3} layout={{ title: 'Most popular brands' }} />
                </Grid>
                <Grid item xs={6}>
                    <Plot data={plot4 === "loading" ? [{
                        values: [0],
                        labels: ['none'],
                        type: 'pie'
                    }] : state} layout={{ title: 'Most popular brands' }} />
                </Grid>
                <Grid item xs={6} >
                    <Plot data={plot5 === "loading" ? [{
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