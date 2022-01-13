import React from "react";
import { Result } from "antd";
import {Link} from 'react-router-dom';
import {Button} from 'antd';

function CompleteOrder() {
  return (
    <div>
      <Result
      status="success"
        title="ORDER SUCSESS"
        subTitle="Order number: 2017182818828182881"
        extra={
          <Link to="/products">
            <Button type="primary" key="console">
              Go Page Products
            </Button>
          </Link>
        }
      />
    </div>
  );
}

export default CompleteOrder;
