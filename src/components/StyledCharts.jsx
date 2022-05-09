import React from 'react';
import { Chart } from "react-google-charts";

export default function StyledChart(props) {
    var options = {
        curveType: 'function',
        legend: {
            textStyle: {
                fontName: "Outfit",
                color: '#A3A3A3'
            }
        },
        chartArea: {
            left: 32,
            top: 8
        },
        vAxis: {
            textStyle: {
                fontName: 'Outfit',
                color: '#A3A3A3',
                fontSize: 12
            },
            viewWindow: {
                min: 0
            }
        },
        hAxis: {
            textStyle: {
                fontName: 'Outfit',
                color: '#A3A3A3',
                fontSize: 12,
            },
            format: '',
            // minValue: 0
        },
        series: {
            0: {
                type: 'line',
                color: '#F9361B',
                visibleInLegend: false
            }
        },
        pointsVisible: true,
        tooltip: {
            trigger: 'none'
        }

    }

    return (

        <Chart
            chartType="LineChart"
            data={props.data}
            width={"100%"}
            height={"384px"}
            options={options}
            legendToggle
        />

    );

}