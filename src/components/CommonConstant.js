import {Popconfirm, Tag} from "antd";
import React from "react";

const commonColumns = [
    {
        title: 'Salary Type',
        dataIndex: 'name',
        key: 'name',
        editable: true,
        render: text => <a>{text}</a>,
        filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
        title: 'primary duration',
        dataIndex: 'primaryduration',
        key: 'primaryduration',
        editable: true,
        sorter: (a, b) => a.primaryduration - b.primaryduration,
        sortOrder: sortedInfo.columnKey === 'primaryduration' && sortedInfo.order,
    },
    {
        title: 'primary amount',
        dataIndex: 'primaryamount',
        key: 'primaryamount',
        editable: true,
        filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.primaryamount.includes(value),
        sorter: (a, b) => a.primaryamount.length - b.primaryamount.length,
        sortOrder: sortedInfo.columnKey === 'primaryamount' && sortedInfo.order,
    },
    {
        title: 'spouse duration',
        dataIndex: 'spouseduration',
        key: 'spouseduration',
        editable: true,
        sorter: (a, b) => a.spouseduration - b.spouseduration,
        sortOrder: sortedInfo.columnKey === 'spouseduration' && sortedInfo.order,
    },
    {
        title: 'spouse amount',
        dataIndex: 'spouseamount',
        key: 'spouseamount',
        editable: true,
        filters: [{ text: 'London', value: 'London' }, { text: 'New York', value: 'New York' }],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.spouseamount.includes(value),
        sorter: (a, b) => a.spouseamount.length - b.spouseamount.length,
        sortOrder: sortedInfo.columnKey === 'spouseamount' && sortedInfo.order,
    },
];

export default commonColumns;