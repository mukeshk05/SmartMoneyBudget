import React from "react";
import { steps } from "./manualfntryforms/steps";
import "../../budget/css/skeleton.css";
import StepZilla from "react-stepzilla";
import "../../../styles/index.css";

class ManualPayEntry extends React.Component {
  state = {
    readyForSubmit: false
  };

  constructor(props) {
    super(props);
    this.handleStepZillaStepChange = this.handleStepZillaStepChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(value) {
    if (this.state.readyForSubmit) {
      console.log("Submitting the form");
      this.props.onFormSubmit(value); // this is the the method that actually triggers the call to the api
    }
  }

  handleStepZillaStepChange(step) {
    //if (step === SUBMIT_STEP_NUMBER)
    {

      // check if we are on the step that should submit
      console.log(step);
      //this.setState({ readyForSubmit: true });
    }
  }

  render() {
    const { current } = this.state;
    return (
      <div className="step-progress">
        <StepZilla
          steps={steps}
          nextButtonCls="multiStepButton"
          backButtonCls="multiStepButton"
          onStepChange={this.handleStepZillaStepChange}
        />
      </div>
    );
  }
}

export default ManualPayEntry;