import React from 'react'
import Benefits from './benefits/Benefits'
import Taxes  from './tax/Taxes'
import PostTaxDeductions from './posttax/PostTaxDeductions'
import Salary from "./salary/Salary";
import PreTaxDeduction from "./pretax/PreTaxDeduction";

const steps = 
    [
      {name: 'Salary', component: <Salary/>},
      {name: 'Benefits', component: <Benefits/>},
      {name: 'Pre Tax Deduction', component: <PreTaxDeduction/>},
      {name: 'Taxes', component: <Taxes/>},
      {name: 'Post Tax Deductions', component: <PostTaxDeductions/>}
    ];

export { steps }