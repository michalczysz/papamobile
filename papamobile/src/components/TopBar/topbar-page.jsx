import { React, useState } from 'react'
import { AppBar, Toolbar, IconButton, Grid } from '@mui/material'
import { Menu as MenuIcon, GitHub } from "@mui/icons-material";
import SideBar from '../sidebar/sidebar-component';
import "./topbar-page.css"

import { Link } from 'react-router-dom';

function TopBar() {
  const [state, setState] = useState(false);

  function onClickHandle() {
    setState(true)
  }

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="App">
      <AppBar className="App-header" position="static" >
        <Toolbar variant="dense">
          <Grid container spacing={{ xs: 0 }} columns={{ xs: 4, sm: 12 }}>
            <Grid item xs={2} sm={4}>
              <div className='grid_cell'>
                <div onClick={onClickHandle}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>

                </div>
                <Link to={'/'} style={{ textDecoration: 'none', 'color': 'inherit'}}>
                  <div className='title'>papimobile</div>
                </Link>
              </div>
            </Grid>
            <Grid item xs={2} sm={4}>
              <div onClick={() => openInNewTab('https://github.com/michalczysz/papamobile')} className='gh-link-title grid_cell'>
                Find this repo on GitHub<spacer/><GitHub/>
              </div>
            </Grid>
            <Grid item xs={0} sm={4}>
              <div></div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <SideBar state={state} setState={setState} />
    </div>
  );
}

export default TopBar;
