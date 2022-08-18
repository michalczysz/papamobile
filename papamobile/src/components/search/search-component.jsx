import React from 'react'
import axios from 'axios';
import useEffectOnce from '../../ReactEX'

import { Grid, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material'
import { Card, CardContent } from '@mui/material'
import "./search-component.css"

import MostCommonPlot from "../plots/most_common_brands"
import Medians from "../plots/medians"
import DailyAvgPlot from "../plots/daily_avg"
import HeatPlot from "../plots/heat_map"
import MapPlot from "../plots/europe_map"

function SearchForm(e) {
    const [state, setState] = React.useState({ 'Brand': '', 'Model': '', 'Year': ['', ''], 'Fuel': '' });
    const [brands, setBrands] = React.useState([])
    const [models, setModels] = React.useState([])
    const [hidePlots, setHidePlots] = React.useState(true)


    const MenuProps = {
        style: {
            maxHeight: 400,
        },
    }

    const years = []
    for (let x = 2022; x > 1899; x--) {
        years.push(x)
    }

    let miles = []
    for (let x = 1; x < 30; x++) {
        miles.push(x * 10)
    }

    function Plots() {
        if (hidePlots === false) {
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
                        <Medians field={'fuel'} search={['Petrol', 'Diesel', 'Electric', 'Hybrid']} title={'Median Price/Fuel'} api_props={api_props} />
                    </Grid>
                    <Grid item xs={6} sm={12}>
                        <DailyAvgPlot type={'price'} title={'Daily median price'} api_props={api_props} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DailyAvgPlot type={'count'} title={'Amount of new listings by day'} api_props={api_props} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Medians field={'milage'} search={miles} title={'Median Price/Milage'} api_props={api_props} />
                    </Grid>
                    <Grid item xs={6} sm={12}>
                        <MapPlot title={["Cars Origin Map", "Cars Origin Bar Chart"]} api_props={api_props} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Medians field={'color'} search={['Black', 'Red', 'Gray', 'Blue', 'Silver', 'White', 'Other']} title={'Median Price/Color'} api_props={api_props} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <HeatPlot imports={['Netherlands', 'Austria', 'Belgium', 'France']} brands={[api_props.brand, 'BMW', 'Mercedes-benz', 'Opel', 'Audi']} title={'Most imported brands from countries'} />
                    </Grid>
                </Grid>
            )
        }
    }

    function onClickMethod() {
        if (state.Brand !== '') {
            setHidePlots(false)
            // Plots()
        }
    }

    const handleChange = (event, param) => {
        setHidePlots(true)
        switch (param) {
            case 'Brand':
                let temp_state = { ...state, Brand: event.target.value }
                setState({ ...temp_state, Model: '' });
                axios.get('http://34.141.144.103:8000/base/mbrand/' + event.target.value)
                    .then((response) => {
                        setModels(response.data.models.sort(function (a, b) {
                            if (a[0] > b[0]) return 1; else return -1
                        }))
                    })
                break;
            case 'Model':
                setState({ ...state, Model: event.target.value });
                break;
            case 'YearSince':
                if (state.Year[1] === '' || event.target.value <= state.Year[1]) {
                    setState({ ...state, Year: [event.target.value, state.Year[1]] });
                } else {
                    alert('Select correct years')
                }
                break;
            case 'YearTill':
                if (state.Year[0] === '' || state.Year[0] <= event.target.value) {
                    setState({ ...state, Year: [state.Year[0], event.target.value] });

                } else {
                    alert('Select correct years')
                }
                break;
            default:
        }
    };

    useEffectOnce(() => {
        axios.get('http://34.141.144.103:8000/base/mbrand')
            .then((response) => {
                let temp = []
                response.data.forEach(brand_r => {
                    temp.push([brand_r.brand, brand_r.count])
                })
                setBrands(temp)
            })
    })

    return (<div className='Detail'>
        <div className="grid-container">
            <Card sx={{ width: '100%' }} style={{ marginBottom: "10px" }}>
                <label className="form-title">What are you looking for?</label>
                <CardContent>
                    <Grid container spacing={{ xs: 3 }} columns={{ xs: 6, sm: 12 }}>
                        {/* Brand Select */}
                        <Grid item xs={6} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Brand</InputLabel>
                                <Select
                                    value={state.Brand}
                                    label={'Brand'}
                                    onChange={event => handleChange(event, 'Brand')}
                                    MenuProps={MenuProps}>
                                    {brands.map((brand, index) => {
                                        return <MenuItem value={brand[0]} key={'key' + brand[0]}>{brand[0] + ' (' + brand[1] + ')'}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Model Select */}
                        <Grid item xs={6} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Model</InputLabel>
                                <Select
                                    value={state.Model}
                                    label={'Model'}
                                    onChange={event => handleChange(event, 'Model')}
                                    MenuProps={MenuProps}
                                    disabled={state.Brand !== '' ? false : true}
                                >
                                    {models.map(model => {
                                        return <MenuItem value={model[0]} key={'key' + model[0]}>{model[0] + ' (' + model[1] + ')'}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Year select */}
                        <Grid item xs={6} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Year since</InputLabel>
                                <Select
                                    value={state.Year[0]}
                                    label={'YearSince'}
                                    onChange={event => handleChange(event, 'YearSince')}
                                    MenuProps={MenuProps}
                                    disabled={state.Brand !== '' && state.Model !== '' ? false : true}
                                >
                                    {years.map(year => {
                                        return <MenuItem value={year} key={'keySince' + year}>{year}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Year till</InputLabel>
                                <Select
                                    value={state.Year[1]}
                                    label={'YearTill'}
                                    onChange={event => handleChange(event, 'YearTill')}
                                    MenuProps={MenuProps}
                                    disabled={state.Brand !== '' && state.Model !== '' ? false : true}
                                >
                                    {years.map(year => {
                                        return <MenuItem value={year} key={'keyTill' + year}>{year}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Fuel select -- In future... maybe...*/}
                        <Grid item xs={12} key={"button_search"}><Button style={{ width: '100%' }} onClick={onClickMethod} variant="contained">Search</Button></Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
        <Plots />
    </div>)
}

export default SearchForm;