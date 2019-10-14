import React from 'react';
import {FixedExpance} from "./FixedExpance";
import {Bills} from "./Bills";
import {VariableExpance} from "./VariableExpance";
import {Savings} from "./Savings";
import {ExtraRetirementSavings} from "./ExtraRetirementSavings";


const BudgetPlannerSteps =
    [
        {name: 'Fixed Expenses', component: <FixedExpance/>},
        {name: 'Bills', component: <Bills/>},
        {name: 'Variable Expenses', component: <VariableExpance/>},
        {name: 'Savings', component: <Savings/>},
        {name: 'Extra Retirement Savings', component: <ExtraRetirementSavings/>}
    ];

export { BudgetPlannerSteps }