import React from "react";
import Lottie from "react-lottie";

import json from '../assets/json/lf30_editor_jz7unh9q.json';

export default function Loading() {

    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: json,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return(
        <div className="modal">
            <Lottie 
                options={lottieOptions}
                height={400}
                width={400}
            />
        </div>
    );

}