import React from 'react'
import axios from 'axios';
import Plot from 'react-plotly.js';
import useEffectOnce from '../../ReactEX'

function HeatPlot({ imports, brands, title }) {
    const [state, setState] = React.useState("loading")

    let data =
    {
        z: [],
        x: [],
        y: [],
        type: 'heatmap',
        hoverongaps: false
    }

    useEffectOnce(() => {
        imports.forEach((import_c, index) => {
            data.y.push(import_c)
            data.z.push([])
            brands.forEach(brand => {
                axios.get('http://34.141.144.103:8000/base/ibb?brand=' + brand + '&import=' + import_c)
                    .then((response) => {
                        data.z[index].push(response.data.count)
                        if (data.x.length < brands.length) data.x.push(brand)
                        if (data.y.length === imports.length && data.x.length === brands.length && data.z[data.z.length - 1].length === brands.length) {
                            setState([data])
                        }
                    });
            })
        })
    })

    return (
        <Plot data={state === "loading" ? [data] : state} layout={{ title: title }} />
    )
}

export default HeatPlot