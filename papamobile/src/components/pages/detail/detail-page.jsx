import React from 'react'
import "./detail-page.css"
import SearchForm from '../../search/search-component'

import { Grid } from '@mui/material'

import MostCommonPlot from "../../plots/most_common_brands"
import Medians from "../../plots/medians"
import DailyAvgPlot from "../../plots/daily_avg"
import HeatPlot from "../../plots/heat_map"
import MapPlot from "../../plots/europe_map"

function Detail() {
  const [state, setState] = React.useState({ 'Brand': '', 'Model': '', 'Year': ['', ''], 'Fuel': '' });

  let miles = []
  for (let x = 1; x < 30; x++) {
    miles.push(x * 10)
  }

  function Plots() {
    if (state.Brand !== '') {
      let api_props = {
        brand: state.Brand,
        model: state.Model,
        year_since: state.Year[0],
        year_till: state.Year[1]
      }

      return (
        <Grid container spacing={{ xs: 1 }} columns={{ xs: 6, sm: 12 }} align="center">
          <Grid item xs={12} sm={6}>
            <MostCommonPlot title={api_props.brand + " market share among other brands"} api_props={api_props} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Medians field={'fuel'} search={['Petrol', 'Diesel', 'Electric', 'Hybrid']} annotations={{ y: 'Price [PLN]', x: '' }} title={'Median Price/Fuel'} api_props={api_props} />
          </Grid>
          <Grid item xs={6} sm={12}>
            <DailyAvgPlot type={'price'} title={'Daily median price'} api_props={api_props} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DailyAvgPlot type={'count'} title={'Amount of new listings by day'} api_props={api_props} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Medians field={'milage'} search={miles} annotations={{ y: 'Price [PLN]', x: "'k Mileage [km]" }} title={'Median Price/Milage'} api_props={api_props} />
          </Grid>
          <Grid item xs={6} sm={12}>
            <MapPlot title={["Cars Origin Map", "Cars Origin Bar Chart"]} api_props={api_props} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Medians field={'color'} search={['Black', 'Red', 'Gray', 'Blue', 'Silver', 'White', 'Other']} annotations={{ y: 'Price [PLN]', x: '' }} title={'Median Price/Color'} api_props={api_props} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <HeatPlot imports={['Netherlands', 'Austria', 'Belgium', 'France']} brands={[api_props.brand, 'BMW', 'Mercedes-benz', 'Opel', 'Audi']} title={'Most imported brands from countries'} />
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <div className='Detail'>
      <SearchForm setSearch={setState} />
      <Plots />
    </div>
  );
}

export default Detail;
