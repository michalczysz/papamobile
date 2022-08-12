import React from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';

function compare(a, b) {
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

function MostCommonPlot() {
    const [state, setState] = React.useState("loading")

    if (state === "loading") {
        console.log('test ')
        axios.get('http://34.141.144.103:8000/base/mbrand?format=json')
            .then((response) => {
                let data = [{
                    values: [],
                    labels: [],
                    type: 'pie'
                }];
                let datas = response.data
                datas.sort(compare)
                datas.slice(0, 9).forEach(element => {
                    data[0].labels.push(element.brand)
                    data[0].values.push(element.count)
                });
                data[0].labels.push('other')
                data[0].values.push(0)
                datas.slice(10, datas.length).forEach(element => {
                    data[0].values[data[0].values.length - 1] += element.count
                });
                setState(data)
            });
    }

    return (
        <Plot data={state === "loading" ? [{
            values: [0],
            labels: ['none'],
            type: 'pie'
        }] : state} layout={{ title: 'Most popular brands' }} />
    )
}
export default MostCommonPlot