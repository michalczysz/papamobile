import React from 'react'
import { Grid, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material'
import { Card, CardContent } from '@mui/material'
import "./search-component.css"

function SearchForm(e) {
    function onClickMethod() {
        //e.preventDefault();
        console.log('lol')
    }

    return (<>
        <div className="grid-container">
            <Card sx={{ width: '100%' }}>
                <label className="form-title">Czego szukasz?</label>
                <CardContent>
                    <Grid container spacing={{ xs: 3 }} columns={{ xs: 6, sm: 12 }}>
                        {['Marka', 'Model', 'Rok', 'Paliwo'].map((e, index) => (
                            <Grid item xs={6} sm={6} key={e + index}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{e}</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    >
                                        <MenuItem>Ten</MenuItem>
                                        <MenuItem>Twenty</MenuItem>
                                        <MenuItem>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        ))}
                        <Grid item xs={12} key={"button_search"}><Button style={{width: '100%'}} onClick={onClickMethod} variant="contained">Szukaj</Button></Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    </>)
}

export default SearchForm;