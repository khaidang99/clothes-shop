import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Result
      className="mt-5"
      status="warning"
      title="Not found"
      extra={
        <Link to="/">
          <Button type="primary" key="console">
            Go Page Home
          </Button>
        </Link>
      }
    />
  );
}

export default NotFound;
