import React from 'react';
import MultiStep from "react-multistep";
import {steps} from "./multistepsform/steps";
import "./css/custom.css";
import "./css/normalize.css";
import "./css/prog-tracker.css";
import "./css/skeleton.css";



const CashFlow = props => {


    return (
        <div className='container'>
            <div>
                <MultiStep steps={steps} />
            </div>
        </div>
     );
};

export default CashFlow;