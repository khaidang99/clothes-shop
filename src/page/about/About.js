import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

function About() {
  return (
    <Result
    className="mt-5"
      status="warning"
      title="This page is under maintenance."
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

export default About;
