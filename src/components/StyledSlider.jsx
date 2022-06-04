import React from 'react';
import Slider from '@mui/material/Slider';

export default function StyledSlider(props) {

    return(
        <div className="slider horizontal">
            <img src={props.image} />
            <Slider
                value={props.value}
                onChange={e => props.setValue(e.target.value)}
                disabled={!props.enabled}
            />
            <p>{props.value}%</p>
        </div>
    )

}