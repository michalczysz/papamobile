import React from 'react'
import { Grid, Button, Topography, InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import { Card, CardContent, CardActions } from '@mui/material'
import "./search-component.css"



function SearchForm(e) {
    function onClickMethod() {
        //e.preventDefault();

        console.log('lo')
    }

    return (<>
        <div className="grid-container">
            <Card sx={{ minWidth: 275 }}>
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
                        <Grid xs={12} item key="search_buttom">
                            <Button variant='contained' style={{width: "100%"}} onClick={onClickMethod} >Szukaj</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    </>)
}

export default SearchForm;