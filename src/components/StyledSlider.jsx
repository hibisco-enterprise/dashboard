import React, {useState} from 'react';
import Slider from '@mui/material/Slider';

export default function StyledSlider(props) {

    const [value, setValue] = useState(0);

    return(
        <div className="slider horizontal">
            <img src={props.image} />
            <Slider
                value={value}
                onChange={e => setValue(e.target.value)}
                disabled={!props.enabled}
            />
            <p>{value}%</p>
        </div>
    )

}