import React from "react";
import {Icon, Layout} from "antd";
const {Footer } = Layout;


const BudgetFooter = props => {


    return (
        <div className='container'>
            <Footer style={{ textAlign: "center" }}>
                © 2019 Created by
                <span>
                   <Icon type="dollar" />
                    {"   "}mart Money
          </span>
            </Footer>
        </div>
    );
};

export default BudgetFooter;

