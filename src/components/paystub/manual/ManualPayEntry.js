import React from "react";
import "../../budget/css/skeleton.css";
import StepZilla from "react-stepzilla";
import "../../../styles/index.css";
import {Col, DatePicker, Row} from "antd";
import moment from "moment";
import Salary from "./manualfntryforms/salary/Salary";
import Benefits from "./manualfntryforms/benefits/Benefits";
import PreTaxDeduction from "./manualfntryforms/pretax/PreTaxDeduction";
import Taxes from "./manualfntryforms/tax/Taxes";
import PostTaxDeductions from "./manualfntryforms/posttax/PostTaxDeductions";
const { MonthPicker} = DatePicker;
const monthFormat = 'YYYY/MMMM';
const selectedDate = new moment();
const startDate = moment([selectedDate._d.getFullYear(), selectedDate._d.getMonth() , 1]).format("YYYY-MM-DD");
const daysInMonth = moment(startDate).daysInMonth();
const endDate = moment(startDate).add(daysInMonth - 1, 'days').format("YYYY-MM-DD");

class ManualPayEntry extends React.Component {
  state = {
    readyForSubmit: false
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      startDate:startDate,
      endDate:endDate,
      currentDate:selectedDate
    };
   }


  onChange=(date, dateString, abc)=>{
    const startDate = moment([date._d.getFullYear(), date._d.getMonth() , 1]).format("YYYY-MM-DD");
    const daysInMonth = moment(startDate).daysInMonth();
    const endDate = moment(startDate).add(daysInMonth - 1, 'days').format("YYYY-MM-DD");
    const transactionDate=moment(endDate).subtract(1,"day").format("YYYY-MM-DD");
    this.setState({startDate:startDate});
    this.setState({endDate:endDate});
    this.setState({currentDate:transactionDate})
  };




  render() {
    console.log(this.props.user)
    return (

        <div className='step-progress'>
          <Row>
            <Col span={5}>
              <div className="App">
                <MonthPicker defaultValue={moment(selectedDate, monthFormat)} format={monthFormat}  placeholder="Select Month"  onChange={(date, dateString) => this.onChange(date, dateString, 1)}/>
              </div>
            </Col>
          </Row>

          <StepZilla  steps={[
            {name: 'Salary', component: <Salary currentDate={this.state.currentDate} startDate={this.state.startDate} endDate={this.state.endDate} user={this.props.user}/>},
            {name: 'Benefits', component: <Benefits currentDate={this.state.currentDate} startDate={this.state.startDate} endDate={this.state.endDate} user={this.props.user}/>},
            {name: 'Pre Tax Deduction', component: <PreTaxDeduction currentDate={this.state.currentDate} startDate={this.state.startDate} endDate={this.state.endDate} user={this.props.user}/>},
            {name: 'Taxes', component: <Taxes currentDate={this.state.currentDate} startDate={this.state.startDate} endDate={this.state.endDate}/>},
            {name: 'Post Tax Deductions', component: <PostTaxDeductions currentDate={this.state.currentDate} startDate={this.state.startDate} endDate={this.state.endDate} user={this.props.user}/>}
          ]}
                      nextButtonCls="multiStepButton"
                      backButtonCls="multiStepButton" />
        </div>
    );

  }
}

export default ManualPayEntry;