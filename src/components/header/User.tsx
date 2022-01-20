import React, { useState } from "react";
import { Popover } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import { logout } from "features/login/LoginSlice";
import { User } from 'types'

type Props = {
  userInfo: User
}

function UserHeader(props : Props) {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { userInfo } = props;

  const handleVisibleChange = (visible: boolean) => {
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

export default UserHeader;
