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
import {endDate, monthFormat, selectedDate, startDate} from "../../common/Duration";
const { MonthPicker} = DatePicker;

class BudgetPlannerEntry extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            startDate:startDate,
            endDate:endDate,
            currentDate:selectedDate
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
        return (

            <div className='step-progress'>
                <Row>
                    <Col span={5}>
                        <div className="App">
                            <MonthPicker defaultValue={moment(selectedDate, monthFormat)} format={monthFormat}  placeholder="Select Month"  onChange={(date, dateString) => this.onChange(date)}/>
                        </div>
                    </Col>
                </Row>

                <StepZilla  steps={[
                    {name: 'Fixed Expenses', component: <FixedExpance currentDate={this.state.currentDate} startDate={this.state.startDate} endDate={this.state.endDate}/>},
                    {name: 'Bills', component: <Bills currentDate={this.state.currentDate} startDate={this.state.startDate} endDate={this.state.endDate}/>},
                    {name: 'Variable Expenses', component: <VariableExpance currentDate={this.state.currentDate} startDate={this.state.startDate} endDate={this.state.endDate}/>},
                    {name: 'Savings', component: <Savings currentDate={this.state.currentDate} startDate={this.state.startDate} endDate={this.state.endDate}/>},
                    {name: 'Extra Retirement Savings', component: <ExtraRetirementSavings currentDate={this.state.currentDate} startDate={this.state.startDate} endDate={this.state.endDate}/>}
                ]}
                            nextButtonCls="multiStepButton"
                backButtonCls="multiStepButton" />
            </div>
        );
    }
}

export default BudgetPlannerEntry;