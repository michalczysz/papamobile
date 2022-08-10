import React from 'react'
import { AppBar, Toolbar, IconButton } from '@mui/material'
import { Menu as MenuIcon } from "@mui/icons-material";
import "./general-page.css"
import SearchForm from '../../search/search-component'

function General() {
  return (
    <div className="App">
      <AppBar className="App-header" position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <h2 className='title'>papimobile</h2>
        </Toolbar>
      </AppBar>
      <div className='body'>
        <SearchForm />
      </div>
    </div>
  );
}

export default General;
