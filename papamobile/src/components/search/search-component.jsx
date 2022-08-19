import React from 'react'
import axios from 'axios';
import useEffectOnce from '../../ReactEX'

import { Grid, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material'
import { Card, CardContent } from '@mui/material'
import "./search-component.css"

function SearchForm({ setSearch }) {
    const [state, setState] = React.useState({ 'Brand': '', 'Model': '', 'Year': ['', ''], 'Fuel': '' });
    const [brands, setBrands] = React.useState([])
    const [models, setModels] = React.useState([])
    // const [hidePlots, setHidePlots] = React.useState(true)


    const MenuProps = {
        style: {
            maxHeight: 400,
        },
    }

    const years = []
    for (let x = 2022; x > 1899; x--) {
        years.push(x)
    }

    function onClickMethod() {
        if (state.Brand !== '') {
            setSearch(state)
        }
    }

    const handleChange = (event, param) => {
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

    return (
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
    )
}

export default SearchForm;