import {React, useState} from 'react'
import { AppBar, Toolbar, IconButton } from '@mui/material'
import { Menu as MenuIcon } from "@mui/icons-material";
import SideBar from '../sidebar/sidebar-component';
import "./topbar-page.css"



function TopBar() {
  const [state, setState] = useState(false);

  function onClickHandle(){
    setState(true)
  }

  return (
    <div className="App">
      <AppBar className="App-header" position="static">
        <Toolbar>
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
          <h2 className='title'>papimobile</h2>
        </Toolbar>
      </AppBar>
      <SideBar state={state} setState={setState}/>
    </div>
  );
}

export default TopBar;
