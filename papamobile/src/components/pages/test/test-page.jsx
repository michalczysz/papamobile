// import React, { useState } from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.count;
    const bandB = b.count;

    let comparison = 0;
    if (bandA < bandB) {
        comparison = 1;
    } else if (bandA > bandB) {
        comparison = -1;
    }
    return comparison;
}

function Test({ state, setState }) {
    if (state === "loading") {
        axios.get('http://34.141.144.103:8000/base/mbrand?format=json')
            .then((response) => {
                // console.log(response.data);
                let data = [{
                    values: [],
                    labels: [],
                    type: 'pie'
                }];
                let datas = response.data
                datas.sort(compare)
                // console.log(datas.slice(0, 9))
                datas.slice(0, 9).forEach(element => {
                    data[0].labels.push(element.brand)
                    data[0].values.push(element.count)
                });
                data[0].labels.push('other')
                data[0].values.push(0)
                datas.slice(10, datas.length).forEach(element => {
                    // console.log()
                    data[0].values[data[0].values.length - 1] += element.count
                });
                // console.log(data)
                setState(data)
            });
    }

    return (
        <>
            output:
            <br />
            <Plot data={state === "loading" ? [{
                values: [0],
                labels: ['none'],
                type: 'pie'
            }] : state} layout={{ title: 'Most popular brands' }} />
            {/* {state} */}
        </>
    )
}

export default Test