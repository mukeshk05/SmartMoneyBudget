import React from 'react'
import { StepOne } from './StepOne'
import { StepTwo } from './StepTwo'
import { StepThree } from './StepThree'
import { StepFour } from './StepFour'
import {FixedExpance} from "./FixedExpance";
import {Bills} from "./Bills";
import {VariableExpance} from "./VariableExpance";
import {Savings} from "./Savings";
import {ExtraRetirementSavings} from "./ExtraRetirementSavings";

const steps = 
    [
      {name: 'Benefits', component: <StepOne/>},
      {name: 'Pre Tax Deduction', component: <StepTwo/>},
      {name: 'Taxes', component: <StepThree/>},
      {name: 'Post Tax Deductions', component: <StepFour/>},
      {name: 'Fixed Expenses', component: <FixedExpance/>},
      {name: 'Bills', component: <Bills/>},
      {name: 'Variable Expenses', component: <VariableExpance/>},
      {name: 'Savings', component: <Savings/>},
      {name: 'Extra Retirement Savings', component: <ExtraRetirementSavings/>}
    ];

export { steps }