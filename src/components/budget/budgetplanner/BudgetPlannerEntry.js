import React from 'react'
import '../../budget/css/skeleton.css';
import StepZilla from "react-stepzilla";
import "../../../styles/index.css";
import {BudgetPlannerSteps} from "./BudgetPlannerSteps";

class BudgetPlannerEntry extends React.Component {
    state = {
        current: 0,
    };


    render() {
        const { current } = this.state;
        return (
            <div className='step-progress'>
                <StepZilla  steps={BudgetPlannerSteps}
                            nextButtonCls="multiStepButton"
                backButtonCls="multiStepButton" />
            </div>
        );
    }
}

export default BudgetPlannerEntry;