
import React from 'react'
// import Plot from 'react-plotly.js';
import { Grid } from '@mui/material'
import './general-page.css'

import MostCommonPlot from "../../plots/most_common_brands"
import Medians from "../../plots/medians"
import DailyPricesPlot from "../../plots/daily_prices"


function Test() {
    // const [commonBrands, setCommonBrands] = React.useState("")
    // const [priceFuel, setPriceFuel] = React.useState("")
    // const [priceColor, setPriceColor] = React.useState("")
    // const [priceMilage, setPriceMilage] = React.useState("")
    // const [] = React.useState("")
    // const [] = React.useState("")


    let miles = []
    for (let x = 1; x < 30; x++) {
        miles.push(x * 10)
    }

    // console.log("test")

    return (
        <div className='General'>
            <Grid container spacing={{ xs: 1 }} columns={{ xs: 6, sm: 12 }}>
                <Grid item xs={12} sm={6}>
                    <MostCommonPlot />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Medians field={'fuel'} search={['Benzyna', 'Diesel', 'Elektryczny', 'Hybryda']} title={'Median Price/Fuel'} />
                </Grid>
                <Grid item xs={12} align="center">
                    <DailyPricesPlot />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Medians field={'milage'} search={miles} title={'Median Price/Milage'} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Medians field={'color'} search={['Czarny', 'Czerwony', 'Szary', 'Niebieski', 'Srebrny', 'Biały', 'Inny kolor']} title={'Median Price/Color'} />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
            </Grid>

        </div>
    )
}

export default Test
