import MultiStep from "react-multistep";
import {steps} from "../multistepsform/steps";
import React from "react";

const TotalIncome = props => {


    return (
        <div className='container'>
            <div>
                <MultiStep steps={steps} />
            </div>
        </div>
    );
};

export default TotalIncome;