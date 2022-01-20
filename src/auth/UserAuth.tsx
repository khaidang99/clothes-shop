import React from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { getProfile } from "features/login/LoginSlice";
export interface Props {
  children: React.ReactNode;
}

const UserAuth: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const { children } = props;

  const profile = async () => {
    await dispatch(getProfile());
  };

  if (token) {
    profile()
  }
  return <div>{children}</div>;
};

export default UserAuth;
