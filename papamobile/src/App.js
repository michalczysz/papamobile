import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import { Menu as MenuIcon, IconButton } from "@mui/material";
import "./App.css"

import SearchForm from './components/search/search-component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="static">
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
          </Toolbar>
        </AppBar>
      </header>
      <body className='body'>
        <b>Czego szukasz?</b><br />
        <SearchForm />
      </body>
    </div>
  );
}

export default App;
