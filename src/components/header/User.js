import React, { useState } from "react";
import { Badge, Popover, Button } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import { logout } from "features/login/LoginSlice";

function User(props) {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { userInfo } = props;

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { state:{ from: location } })
  };

  return (
    <Popover
      content={
        <a onClick={handleLogout} className="link-danger">
          Logout
        </a>
      }
      title={userInfo.name}
      trigger="click"
      placement="bottomRight"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <button className="btn-wishlist">
        <i className="bi bi-person"></i>
      </button>
    </Popover>
  );
}

export default User;
