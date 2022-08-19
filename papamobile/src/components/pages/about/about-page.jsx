import React from 'react'
import reactLogo from '../../images/react-logo.svg'
import muiLogo from '../../images/mui-logo.svg'
import plotlytLogo from '../../images/plotly-logo.png'

import { GitHub as GHIcon } from '@mui/icons-material'
import { Grid } from '@mui/material'

import './about-page.css'

function About() {
  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='about'>
      <div className="box">
        <img src={reactLogo} alt="react logo" width={250} height={250}/>
        <img src={muiLogo} alt="mui logo" width={250} height={250}/>
      </div>
      <div className="box2">
        <img src={plotlytLogo} alt="plotly logo" />
      </div>
      <div className='info'>
        <Grid container spacing={{ xs: 3 }} columns={{ xs: 6, sm: 12 }}>
          <Grid item xs={6}>
            <div className='authors'>
              <div className="info-title"><b>Authors</b></div>
              <div onClick={() => openInNewTab('https://github.com/michalczysz')} className='author'>
                <GHIcon /> Web backend/frontend: Michał Czysz
            </div>
              <div onClick={() => openInNewTab('https://github.com/ignacyr')} className='author'>
                <GHIcon /> Web scrapping software: Ignacy Rogatty
            </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='technologies'>
              <div className="info-title"><b>Stack</b></div>
              Frontend (JavaScript):
          <br />
              <li>React</li>
              <li>Material UI</li>
              <li>Plotly</li>
              <br />
              Backend (Python):
          <br />
              <li>Django</li>
              <li>Django Rest Framework</li>
              <br />
              Web Scraper (Python):
          <br />
              <li>Scrapy - library</li>
              <li>Pandas</li>
              <br />
              Databases:
          <br />
              <li>SQLite3</li>
              <li>Amazon S3</li>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default About