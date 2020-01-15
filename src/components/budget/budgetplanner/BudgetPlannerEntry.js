import React from 'react'
import '../../budget/css/skeleton.css';
import StepZilla from "react-stepzilla";
import "../../../styles/index.css";
import {Col, Row} from "antd";
import {DatePicker} from 'antd';
import moment from "moment";
import FixedExpance from "./fixedexpenses/FixedExpance";
import Bills from "./bill/Bills";
import VariableExpance from "./variableexpance/VariableExpance";
import Savings from "./savings/Savings";
import ExtraRetirementSavings from "./extraretirementsavings/ExtraRetirementSavings";
import {withRouter} from "react-router-dom";
import {endDate, monthFormat, selectedDate, startDate, yearEndDate, yearStartDate} from "../../common/Duration";
const { MonthPicker} = DatePicker;

class BudgetPlannerEntry extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            startDate:startDate,
            endDate:endDate,
            currentDate:selectedDate.format("YYYY-MM-DD")
        };
    }


    onChange=(date)=>{
        const startDate = moment([date._d.getFullYear(), date._d.getMonth() , 1]).format("YYYY-MM-DD");
        const daysInMonth = moment(startDate).daysInMonth();
        const endDate = moment(startDate).add(daysInMonth - 1, 'days').format("YYYY-MM-DD");
        const transactionDate=moment(endDate).subtract(1,"day").format("YYYY-MM-DD");
        this.setState({startDate:startDate});
        this.setState({endDate:endDate});
        this.setState({currentDate:transactionDate})
    };


    render() {
        const yearEndDate = moment(this.state.currentDate)
            .subtract( 1, "year")
            .format("YYYY-MM-DD");
        return (

            <div className='step-progress'>


                <StepZilla  steps={[
                    {name: 'Fixed Expenses', component: <FixedExpance currentDate={this.state.currentDate} startDate={yearEndDate} endDate={this.state.currentDate} user={this.props.user} history= {this.props.history}/>},
                    {name: 'Bills', component: <Bills currentDate={this.state.currentDate} startDate={yearEndDate} endDate={this.state.currentDate}  user={this.props.user}/>},
                    {name: 'Variable Expenses', component: <VariableExpance currentDate={this.state.currentDate} startDate={yearEndDate} endDate={this.state.currentDate}  user={this.props.user}/>},
                    {name: 'Savings', component: <Savings currentDate={this.state.currentDate} startDate={yearEndDate} endDate={this.state.currentDate}  user={this.props.user}/>},
                    {name: 'Extra Retirement Savings', component: <ExtraRetirementSavings currentDate={this.state.currentDate} startDate={yearEndDate} endDate={this.state.currentDate}  user={this.props.user}/>}
                ]}
                            nextButtonCls="multiStepButton"
                backButtonCls="multiStepButton" />
            </div>
        );
    }
}

export default withRouter(BudgetPlannerEntry);