import React from 'react'
import "./App.css"

import SearchForm from './components/search/search-component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>papimobile</h1>
      </header>
      <body className='body'>
        <b>Czego szukasz?</b><br/>
        <SearchForm />
      </body>
    </div>
  );
}

export default App;
