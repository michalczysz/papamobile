import React from 'react'
import axios from 'axios';
import useEffectOnce from '../../ReactEX'

import { Grid, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material'
import { Card, CardContent } from '@mui/material'
import "./search-component.css"

function SearchForm(e) {
    function onClickMethod() {
        //e.preventDefault();
        console.log('lol')
    }

    const [state, setState] = React.useState({ 'Brand': '', 'Model': '', 'Year': '', 'Fuel': '' });
    const [brands, setBrands] = React.useState([])
    const [models, setModels] = React.useState([])

    const handleChangeBrand = (event, param) => {
        setState({ ...state, [param]: event.target.value });

        axios.get('http://34.141.144.103:8000/base/mbrand')
            .then((response) => {
                // console.log(response)
                let temp = []
                response.data.forEach(brand_r => {
                    temp.push([brand_r.brand, brand_r.count])
                })
                setBrands(temp)
            })
    };

    const handleChangeModel = (event, param) => {}

    useEffectOnce(() => {
        axios.get('http://34.141.144.103:8000/base/mbrand')
            .then((response) => {
                // console.log(response)
                let temp = []
                response.data.forEach(brand_r => {
                    temp.push([brand_r.brand, brand_r.count])
                })
                setBrands(temp)
            })
    })

    return (<>
        <div className="grid-container">
            <Card sx={{ width: '100%' }}>
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
                                    onChange={event => handleChangeBrand(event, 'Brand')}
                                    MenuProps={{
                                        style: {
                                            maxHeight: 400,
                                        },
                                    }}>
                                    {brands.map(brand => {
                                        return <MenuItem value={brand[0]} key={'key' + brand[0]}>{brand[0] + ' (' + brand[1] + ')'}</MenuItem>
                                    })}
                                    {/* <MenuItem value={10}>Ten</MenuItem> */}
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
                                    onChange={event => handleChangeModel(event, 'Model')}
                                    MenuProps={{
                                        style: {
                                            maxHeight: 400,
                                        },
                                    }}>
                                    {models.map(model => {
                                        return <MenuItem value={model[0]} key={'key' + model[0]}>{model[0] + ' (' + model[1] + ')'}</MenuItem>
                                    })}
                                    {/* <MenuItem value={10}>Ten</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Year select */}
                        <Grid item xs={12} key={"button_search"}><Button style={{ width: '100%' }} onClick={onClickMethod} variant="contained">Search</Button></Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    </>)
}

export default SearchForm;