import React from 'react'

import "./search-component.css"

function SearchForm(){
    return(<>
    <div className="grid-container">
        <div className="item1 label_selector"><label>Marka</label></div>
        <div className="item2 label_selector"><label>Model</label></div>
        <div className="item3 label_selector"><label>Rocznik</label></div>
        <div className="item4 label_selector"><label>Paliwo</label></div>
    </div>
    </>)
}

export default SearchForm;