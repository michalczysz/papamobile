import React from 'react'
import { Grid, Button, Topography, InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import { Card, CardContent, CardActions } from '@mui/material'
import "./search-component.css"

function SearchForm() {
    return (<>
        <div className="grid-container">
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Grid container spacing={{ xs: 3 }} columns={{ xs: 12 }}>
                        {['Marka', 'Model', 'Rok', 'Paliwo'].map((e, index) => (
                            <Grid item xs={6}>
                                <InputLabel id="demo-simple-select-label">{e}</InputLabel>
                                <FormControl fullWidth>
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
                    </Grid>
                </CardContent>
            </Card>
        </div>
    </>)
}

export default SearchForm;