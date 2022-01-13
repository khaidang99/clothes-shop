import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import ItemCart from "components/itemCart/ItemCart";
import { setQuantityCart } from 'features/common/commonSlice';
import "./Cart.style.scss";

function Cart() {
  const cartSession = window.sessionStorage.getItem("cart")
    ? JSON.parse(window.sessionStorage.getItem("cart"))
    : [];

  const [cart, setCart] = useState(cartSession);

  const dispatch = useDispatch()

  const listCart = cart.map((item) => (
    <ItemCart
      deleteCart={deleteCart}
      updateCart={updateCart}
      key={item._id}
      {...item}
    />
  ));

  const getTotal = () => {
    return cart.reduce((previousValue, currentValue) => {
      if (currentValue.select) {
        return previousValue + currentValue.price * currentValue.quantity;
      }
      return previousValue;
    }, 0);
  };

  function onChange(e) {
    const newCart = cart.map((x) => {
      return { ...x, select: e.target.checked };
    });
    setCart(newCart);
    window.sessionStorage.setItem("cart", JSON.stringify(newCart));
  }

  function updateCart(value) {
    const newCart = [...cart];
    const cartIndex = newCart.findIndex((x) => x._id === value._id);
    newCart[cartIndex] = value;
    setCart(newCart);
    window.sessionStorage.setItem("cart", JSON.stringify(newCart));
  }

  function deleteCart(_id) {
    const newCart = cart.filter((x) => x._id !== _id);
    setCart(newCart);
    window.sessionStorage.setItem("cart", JSON.stringify(newCart));
    dispatch(setQuantityCart(newCart.length))
  }

  function currencyFormat(num) {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }

  return (
    <Row gutter={[15]} className="page-cart">
      <Col lg={{ span: 14, offset: 2 }}>
        <Col lg={24}>
          <div className="header-cart">Cart</div>
        </Col>
        <Col lg={24}>
          <Row
            className="header-list shadow-sm p-3 mb-3 body rounded"
            align="middle"
          >
            <Col lg={1}>
              <Checkbox defaultChecked={false} onChange={onChange} />
            </Col>
            <Col lg={3}>Image</Col>
            <Col lg={5}>Name</Col>
            <Col lg={3}>
              <div>Option</div>
            </Col>
            <Col lg={3}>Price</Col>
            <Col lg={4}>Qunatity</Col>
            <Col lg={3}>total</Col>
            <Col lg={1}>Delete</Col>
          </Row>
          {listCart}
        </Col>
      </Col>
      <Col lg={6}>
        <div className="main-cart-right bg-light">
          <div className="order-title border-bottom">ORDER</div>
          <div className="promo-code-title">ENTER PROMO CODE</div>
          <div className="group-input-code d-flex border-bottom">
            <Input />
            <Button type="primary" ghost>
              APPLY
            </Button>
          </div>
          <div className="group-total d-flex justify-content-between">
            <span className="text-total">Total</span>
            <span className="number-total">
              {currencyFormat(getTotal().toString())}
            </span>
          </div>
          <div className="group-discount d-flex justify-content-between border-bottom">
            <span className="text-total">Discount</span>
            <span className="number-total">0</span>
          </div>
          <div className="group-tottol-money d-flex justify-content-between border-bottom">
            <span className="text-total">Total money</span>
            <span className="number-total">
              {currencyFormat(getTotal().toString())}
            </span>
          </div>
          <Link to="/shipping">
            <Button className="btn-paying">CONTINUE PAYING</Button>
          </Link>
        </div>
      </Col>
    </Row>
  );
}

export default Cart;
