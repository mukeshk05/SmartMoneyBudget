import { Select } from "antd";
import { durationType } from "./Duration";
import React from "react";
const { Option } = Select;



export const salaryChartData = queryData => {};

export const salaryTableData = queryData => {
  const salaryTableData = [];
  let primaryTotalSalary = 0;
  let spouseTotalSalary = 0;
  for (let i in queryData) {
    salaryTableData.push({
      key: queryData[i].id,
      topic: queryData[i].salary_category_id.salary_type_name,
      salary_category_id: queryData[i].salary_category_id.id,
      user_id: queryData[i].user_id,
      primaryduration: (
        <Select
          defaultValue={durationType[queryData[i].duration]}
          onChange={e => this.handlePrimaryDurationChange(e, queryData[i])}
          showSearch
          style={{ width: 100 }}
          placeholder="Select a type"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
            {durationType.map(duration => (
                <Option key={duration} value={duration}>
                    {duration}
                </Option>
            ))}
        </Select>
      ),
      primaryamount: queryData[i].salary_amount,

      spouseduration: (
        <Select
          defaultValue={durationType[queryData[i].spouse_duration]}
          onChange={e => this.handleSpouseDurationChange(e, queryData[i])}
          showSearch
          style={{ width: 100 }}
          placeholder="Select a type"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {durationType.map(duration => (
            <Option key={duration} value={duration}>
              {duration}
            </Option>
          ))}
        </Select>
      ),
      spouseamount: queryData[i].spouse_salary
    });
    primaryTotalSalary = primaryTotalSalary + queryData[i].salary_amount;
    spouseTotalSalary = spouseTotalSalary + queryData[i].spouse_salary;
  }
  return [salaryTableData, primaryTotalSalary, spouseTotalSalary];
};