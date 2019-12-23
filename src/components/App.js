import React, { Component } from "react";
import BudgetSideBar from "./budget/BudgetSideBar";
import PayStubSideBar from "./paystub/PayStubSideBar";
import AdviceSideBar from "./advice/AdviceSideBar";
import GoalsSideBar from "./goals/GoalsSideBar";
import CalculatorSideBar from "./calculators/CalculatorSideBar";
import AccountsSideBar from "./accounts/AccountsSideBar";
import Login from "./login/Login";
import PrivateRoute from "./PrivateRoute";
import app from "./base";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { createHashHistory } from 'history';
import SavingDataForChart from "./dashboard/SavingDataForChart";

const history = createHashHistory();

class App extends Component {

    state = { loading: true, authenticated: false, user: null };


    componentWillMount() {
        app.auth().onAuthStateChanged(user => {
            if (user) {

                this.setState({
                    authenticated: true,
                    user: user,
                    loading: false
                });
                history.push('/')
            } else {
                this.setState({
                    authenticated: false,
                    user: null,
                    loading: false
                });
            }
        });
    }

  render() {

      const { authenticated, loading,user } = this.state;

      if (loading) {
          return <p>Loading..</p>;
      }


      return (
      <div className="app-container cover">
          <Switch>
              <PrivateRoute exact path="/" component={SavingDataForChart}  authenticated={authenticated} user={user} />
              <PrivateRoute exact path="/budget" component={BudgetSideBar}  authenticated={authenticated} user={user} />
              <Route exact path='/login' component={Login}/>
              <PrivateRoute exact path='/paystub' component={PayStubSideBar} authenticated={authenticated} user={user}/>
              <PrivateRoute exact path='/advice' component={AdviceSideBar} authenticated={authenticated} user={user}/>
              <PrivateRoute exact path='/goals' component={GoalsSideBar} authenticated={authenticated} user={user}/>
              <PrivateRoute exact path="/calculator" component={CalculatorSideBar} authenticated={authenticated} user={user}  />
              <PrivateRoute exatc path="/accounts" component={AccountsSideBar} authenticated={authenticated} user={user}/>
              <PrivateRoute path="/budget/budgetspending" component={BudgetSideBar} authenticated={authenticated} user={user} />
              <PrivateRoute path="/budget/trackers" component={BudgetSideBar} authenticated={authenticated} user={user}/>
              <PrivateRoute path="/budget/cashflow" component={BudgetSideBar} authenticated={authenticated} user={user}/>
              <PrivateRoute path="/budget/saving" component={BudgetSideBar} authenticated={authenticated} user={user}/>
              <PrivateRoute path="/budget/income" component={BudgetSideBar} authenticated={authenticated} user={user}/>
              <PrivateRoute path="/paystub/manualentry" component={PayStubSideBar} authenticated={authenticated} user={user} />
              <PrivateRoute path="/paystub/autoscanpdf" component={PayStubSideBar} authenticated={authenticated} user={user}/>
              <PrivateRoute path="/accounts/cash" component={AccountsSideBar} authenticated={authenticated} user={user}/>
              <PrivateRoute path="/budget/budgetEntry" component={BudgetSideBar} authenticated={authenticated} user={user}/>
          </Switch>
      </div>
    );
  }
}

export default (App);
