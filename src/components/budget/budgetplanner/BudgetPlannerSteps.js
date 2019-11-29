import React from 'react';
import FixedExpance from "./fixedexpenses/FixedExpance";
import Bills from "./bill/Bills";
import VariableExpance from "./variableexpance/VariableExpance";
import Savings from "./savings/Savings";
import ExtraRetirementSavings from "./extraretirementsavings/ExtraRetirementSavings";


const BudgetPlannerSteps =
    [
        {name: 'Fixed Expenses', component: <FixedExpance/>},
        {name: 'Bills', component: <Bills/>},
        {name: 'Variable Expenses', component: <VariableExpance/>},
        {name: 'Savings', component: <Savings/>},
        {name: 'Extra Retirement Savings', component: <ExtraRetirementSavings/>}
    ];

export { BudgetPlannerSteps }