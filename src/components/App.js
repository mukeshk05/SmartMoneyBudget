import React, { Component } from "react";
import { Route,Switch } from 'react-router-dom';
import BudgetSideBar from "./budget/BudgetSideBar";
import PayStubSideBar from "./paystub/PayStubSideBar";
import AdviceSideBar from "./advice/AdviceSideBar";
import GoalsSideBar from "./goals/GoalsSideBar";
import CalculatorSideBar from "./calculators/CalculatorSideBar";
import AccountsSideBar from "./accounts/AccountsSideBar";
import Login from "./login/Login";


class App extends Component {
  render() {
    return (
      <div className="app-container cover">
          <Switch>
              <Route exact path='/' component={Login}/>
              <Route exact path='/budget' component={BudgetSideBar}/>
              <Route exact path='/paystub' component={PayStubSideBar}/>
              <Route exact path='/advice' component={AdviceSideBar}/>
              <Route exact path='/goals' component={GoalsSideBar}/>
              <Route exact path="/calculator" component={CalculatorSideBar}  />
              <Route exatc path="/accounts" component={AccountsSideBar}/>
              <Route path="/budget/budgetspending" component={BudgetSideBar} />
              <Route path="/budget/trackers" component={BudgetSideBar} />
              <Route path="/budget/cashflow" component={BudgetSideBar}/>
              <Route path="/budget/saving" component={BudgetSideBar}/>
              <Route path="/budget/income" component={BudgetSideBar}/>
              <Route path="/paystub/manualentry" component={PayStubSideBar} />
              <Route path="/paystub/autoscanpdf" component={PayStubSideBar}/>
              <Route path="/accounts/cash" component={AccountsSideBar}/>
              <Route path="/budget/budgetEntry" component={BudgetSideBar} />
          </Switch>
      </div>
    );
  }
}

export default App;
