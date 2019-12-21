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
              <PrivateRoute exact path="/" component={BudgetSideBar}  authenticated={authenticated} user={user} />
              <Route exact path='/login' component={Login}/>
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
