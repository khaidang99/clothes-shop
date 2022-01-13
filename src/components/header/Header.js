import { Link } from "react-router-dom";
import "./Header.style.scss";
import { Badge, Popover } from "antd";
import { useSelector } from "react-redux";

import CustomLink from "components/router/CustomLink";
import User from "./User";

function Header(props) {
  const quantityCart = useSelector((state) => state.common.quantityCart);
  const {userInfo} = useSelector((state) => state.login);
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
        {userInfo ? <User userInfo={userInfo}/> : <></>}
      </div>
    </header>
  );
}

export default Header;
