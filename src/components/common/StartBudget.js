import React, {useEffect, useState} from 'react';
import {Alert, Button, Icon, Layout, Menu, notification, Popover, Result, Spin} from "antd";
import { compose, Mutation, withApollo, graphql } from "react-apollo";
import moment from "moment";
import {
    USER_FIXED_EXPENSES_QUERY,
    USER_MONTEHLY_FIXED_EXPENSESG, USER_MONTEHLY_FIXED_EXPENSESG_FOR_BUDGET_CREATION
} from "../../graphql/queries/fixedexpenses/FixedExpensesQuery";
const { Content, Sider, Footer } = Layout;
class StartBudget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    toggleLoading = value => {
        this.setState({ loading: value });
    };

    handleClick=async ()=>{
        notification.destroy();
        this.toggleLoading(true);
        const startDate=moment(this.props.startDate).subtract(1, 'months') .format("YYYY-MM-DD");
        const daysInMonth = moment(startDate).daysInMonth();
        const daysInYear = moment(startDate).dayOfYear();
        const email=this.props.user.email;
        const endDate = moment(startDate)
            .add(daysInMonth - 1, "days")
            .format("YYYY-MM-DD");

        this.props.client.query({
            query:USER_MONTEHLY_FIXED_EXPENSESG_FOR_BUDGET_CREATION,
            variables:{user_id: email,tranaction_start_date:startDate,transaction_end_date:endDate,intailDate:this.props.startDate}
        })

    }

    render() {
        const month=moment(this.props.startDate).format("MMMM");
        const name=this.props.user.displayName;
        const title="Hey "+name+", looks like you need a budget for "  +month  ;
        const content=(
            <Result
                status="500"
                title={title}
                subTitle="Start Planing."
                extra={<Button type="primary" onClick={this.handleClick}>Start Planing For {month}</Button>}
            />
        );
        return (
            <div>
                <Spin size="large" spinning={this.state.loading}>
                {  <Alert message={content} type="warning"/>}
                {
                    notification['warning']({
                        message: '',
                        description:content,
                        placement:"topRight",
                        duration: 0,
                        onClick:this.handleClick
                    })
                }
                </Spin>
            </div>
        );
    }
};

export default (withApollo(StartBudget));
