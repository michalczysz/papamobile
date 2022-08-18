
import React from 'react'
// import Plot from 'react-plotly.js';
import { Grid } from '@mui/material'
import './general-page.css'

import MostCommonPlot from "../../plots/most_common_brands"
import Medians from "../../plots/medians"
import DailyAvgPlot from "../../plots/daily_avg"
import HeatPlot from "../../plots/heat_map"
import MapPlot from "../../plots/europe_map"

// import CircularProgress from '@mui/material/CircularProgress';

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
            <Grid container spacing={{ xs: 1 }} columns={{ xs: 6, sm: 12 }} align="center">
                <Grid item xs={12} sm={6}>
                    <MostCommonPlot title={'Market share among brands'}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Medians field={'fuel'} search={['Petrol', 'Diesel', 'Electric', 'Hybrid']} title={'Median Price/Fuel'} />
                </Grid>
                <Grid item xs={6} sm={12}>
                    <DailyAvgPlot type={'price'} title={'Daily median price'}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DailyAvgPlot type={'count'} title={'Amount of new listings by day'}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Medians field={'milage'} search={miles} title={'Median Price/Milage'} />
                </Grid>
                <Grid item xs={6} sm={12}>
                    <MapPlot title={["Cars Origin Map", "Cars Origin Bar Chart"]}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Medians field={'color'} search={['Black', 'Red', 'Gray', 'Blue', 'Silver', 'White', 'Other']} title={'Median Price/Color'} />
                    {/* <CircularProgress style={{'marginTop': '50%'}}/> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <HeatPlot imports={['Netherlands', 'Austria', 'Belgium', 'France']} brands={['BMW', 'Mercedes-benz', 'Opel', 'Ford', 'Audi']} title={'Most imported brands from countries'}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Test
