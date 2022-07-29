import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./App.css"

import SearchForm from './components/search/search-component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="static">
          <Toolbar className="Bar-header">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h4" className="Menu-title">papimobile</Typography> */}
            <h1 className="Menu-title">papimobile</h1>
          </Toolbar>
        </AppBar>
      </header>
      <div className='body'>
        <SearchForm />
      </div>
    </div>
  );
}

export default App;
