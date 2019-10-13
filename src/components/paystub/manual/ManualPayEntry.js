import React from 'react'
import {steps} from "./manualfntryforms/steps";
import '../../budget/css/skeleton.css';
import StepZilla from "react-stepzilla";
import "../../../styles/index.css";

class ManualPayEntry extends React.Component {
    state = {
        current: 0,
    };


    render() {
        const { current } = this.state;
        return (
            <div className='step-progress'>
                <StepZilla  steps={steps}
                            nextButtonCls="multiStepButton"
                backButtonCls="multiStepButton" />
            </div>
        );
    }
}

export default ManualPayEntry;