import React from 'react'
import { Benefits } from './Benefits'
import { PreTaxDeduction } from './PreTaxDeduction'
import { Taxes } from './Taxes'
import { PostTaxDeductions } from './PostTaxDeductions'
import {FixedExpance} from "../../../budget/budgetplanner/FixedExpance";
import {Bills} from "../../../budget/budgetplanner/Bills";
import {VariableExpance} from "../../../budget/budgetplanner/VariableExpance";
import {Savings} from "../../../budget/budgetplanner/Savings";
import {ExtraRetirementSavings} from "../../../budget/budgetplanner/ExtraRetirementSavings";
import {Salary} from "./Salary";

const steps = 
    [
      {name: 'Salary', component: <Salary/>},
      {name: 'Benefits', component: <Benefits/>},
      {name: 'Pre Tax Deduction', component: <PreTaxDeduction/>},
      {name: 'Taxes', component: <Taxes/>},
      {name: 'Post Tax Deductions', component: <PostTaxDeductions/>}
    ];

export { steps }