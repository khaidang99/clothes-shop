import React, { useState, useEffect } from "react";
import { Checkbox, Row, Col, Input, Button, Form, Select, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import InputField from "custom-fields/input/InputField";
import SelectField from "custom-fields/select/SelectField";
import { setQuantityCart } from 'features/common/commonSlice';
import './Shipping.style.scss';

function Shipping() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const cartSession = window.sessionStorage.getItem("cart")
    ? JSON.parse(window.sessionStorage.getItem("cart"))
    : [];
  const cartSelected = cartSession.filter((cart) => cart.select === true)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  useEffect(() => {
    if (cartSession.length <= 0 || !cartSession) {
    }
    getProvinces();
  }, []);

  const getProvinces = async () => {
    const res = await axios.get(`https://provinces.open-api.vn/api/p/`);
    setProvinces(res.data);
  };

  const onChangeProvinces = async (value) => {
    if (!value) {
      setDistricts([]);
    } else {
      const provinceSelected = provinces.find(
        (province) => province.name === value
      );
      const res = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceSelected.code}`,
        { params: { depth: 2 } }
      );
      setDistricts(res.data.districts);
    }
  };

  const onFinish = async (values) => {
    console.log(values);
    const newCartSession = cartSession.filter(cart => !cart.select)
    window.sessionStorage.setItem('cart', JSON.stringify(newCartSession))
    dispatch(setQuantityCart(newCartSession.length))
    navigate("/complete-order")
  };

  const onChangeDistricts = async (value) => {
    if (!value) {
      setWards([]);
    } else {
      const wardSelected = districts.find((ward) => ward.name === value);
      const res = await axios.get(
        `https://provinces.open-api.vn/api/d/${wardSelected.code}`,
        { params: { depth: 2 } }
      );
      setWards(res.data.wards);
    }
  };

  const listCartSelected = cartSelected.map(cart => {
    return (
      <div key={cart._id} className="item-cart-seclected">
        <div className="group-name-cart">
          <span className="name-cart">{cart.name}</span>
          <span className="price-cart">{cart.price} VND</span>
        </div>
        <div className="group-size-cart">
          <span className="size-cart">size: {cart.sizeSelected}</span>
          <span className="quantity-cart">x{cart.quantity}</span>
        </div>
      </div>
    )
  });

  const getTotal = () => {
    return cartSelected.reduce((previousValue, currentValue) => {
      if (currentValue.select) {
        return previousValue + currentValue.price * currentValue.quantity;
      }
      return previousValue;
    }, 0);
  };

  function currencyFormat(num) {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }

  const handleCompalete = () => {
    form.submit()
  }

  if (cartSelected.length <= 0) {
    return (
      <Result
        title="There are no products in the cart"
        extra={
          <Link to="/products">
            <Button type="primary" key="console">
              Go Page Products
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <Row gutter={[15]} className="page-cart">
      <Col lg={{ span: 10, offset: 4 }}>
        <Col lg={24}>
          <div className="header-cart">Cart</div>
        </Col>
        <Col lg={24}>
          <Form name="basic" autoComplete="off" labelCol={{span:4}} labelAlign="left" wrapperCol={{span:14}} form={form} onFinish={onFinish}>
            <InputField
              name="fullName"
              label="Full name" 
              placeholder="full name"
              rules={[{ required: true }]}
            />
            <InputField
              name="phoneNumber"
              label="Phone number"
              placeholder="phone number"
              rules={[{ required: true }]}
            />
            <InputField
              name="email"
              label="Email"
              placeholder="full name"
              rules={[{ required: true }]}
            />
            <InputField
              name="address"
              label="address"
              placeholder="Address"
              rules={[{ required: true }]}
            />
            <SelectField
              name="province"
              label="Provice"
              placeholder="select provice"
              rules={[{ required: true }]}
              options={provinces}
              onChangeSelect={onChangeProvinces}
            />
            <SelectField
              name="district"
              label="district"
              placeholder="select district"
              rules={[{ required: true }]}
              options={districts}
              onChangeSelect={onChangeDistricts}
            />
            <SelectField
              name="ward"
              label="ward"
              rules={[{ required: true }]}
              placeholder="select ward"
              options={wards}
            />
          </Form>
        </Col>
      </Col>
      <Col lg={6}>
        <div className="main-cart-right bg-light">
          <div className="order-title border-bottom">ORDER</div>
          <div className="group-cart-selected d-flex border-bottom">
            {listCartSelected}
          </div>
          <div className="group-total d-flex justify-content-between">
            <span className="text-total">Total</span>
            <span className="number-total">
            {currencyFormat(getTotal().toString())}
            </span>
          </div>
          <div className="group-discount d-flex justify-content-between">
            <span className="text-total">Discount</span>
            <span className="number-total">0</span>
          </div>
          <div className="group-transport d-flex justify-content-between border-bottom">
            <span className="text-transport">Transport fee</span>
            <span className="number-transport">0</span>
          </div>
          <div className="group-tottol-money d-flex justify-content-between border-bottom">
            <span className="text-total">Total money</span>
            <span className="number-total">
            {currencyFormat(getTotal().toString())}
            </span>
          </div>
          <Button className="btn-paying" onClick={handleCompalete}>COMPLETE ORDER</Button>
        </div>
      </Col>
    </Row>
  );
}

export default Shipping;
