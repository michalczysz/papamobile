import React from 'react'
import { Grid, InputLabel, FormControl, Select, MenuItem, Button } from '@mui/material'
import { Card, CardContent } from '@mui/material'
import "./search-component.css"

function SearchForm() {
    return (<>
        <div className="grid-container">
            <Card sx={{ maxWidth: 840, minWidth: 300, width: "100%" }}>
                <CardContent>
                    <b className='Search-Title'>Czego szukasz?</b>
                    <Grid container spacing={{ xs: 3 }}>
                        {['Marka', 'Model', 'Rok', 'Paliwo'].map((e, index) => (
                            <Grid item xs={6} key={e + index}>
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
                        <Grid item xs={12} key={"button_search"}><Button style={{width: '100%'}} variant="contained">Szukaj</Button></Grid>
                    </Grid>

                </CardContent>
            </Card>
        </div>
    </>)
}

export default SearchForm;