import { Link } from "react-router-dom";
import "./Header.style.scss";
import { Badge } from "antd";
import { useSelector } from "react-redux";
import type { RootState } from 'app/Store';

import CustomLink from "components/router/CustomLink";
import User from "./User";

function Header() {
  const quantityCart = useSelector((state : RootState) => state.common.quantityCart);
  const { userInfo } = useSelector((state : RootState) => state.login);
  
  return (
    <header id="header">
      <ul className="nav-left">
        <li>
          <CustomLink to="/">Home</CustomLink>
        </li>
        <li>
          <CustomLink to="/products">Products</CustomLink>
        </li>
        <li>
          <CustomLink to="/about">About</CustomLink>
        </li>
        <li>
          <CustomLink to="/contact">Contact</CustomLink>
        </li>
      </ul>
      <div className="nav-right">
        <button className="btn-wishlist">
          <i className="bi bi-heart"></i>
        </button>
        <Link to="/cart" className="btn-cart">
          <Badge count={quantityCart}>
            <i className="bi bi-cart3"></i>
          </Badge>
        </Link>
        {userInfo?.name ? <User userInfo={userInfo}/> : <></>}
      </div>
    </header>
  );
}

export default Header;
