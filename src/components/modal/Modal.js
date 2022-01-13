import React, { useState, useEffect } from "react";
import { Form, Button, InputNumber, Modal } from "antd";
import { useDispatch } from "react-redux";

import RadioButtonField from "custom-fields/radio/RadioButtonField";
import { setQuantityCart } from "features/common/commonSlice";
import "./Modal.style.scss";
import SwiperImg from "../swiperImg/SwiperImg";
import { number } from "yup/lib/locale";

function Modal1(props) {
  const dispatch = useDispatch();
  const { _id, name, image, price, description, size, setVisibleModal } = props;
  const visible = props.visible ? props.visible : false;

  const handleCancel = () => {
    setVisibleModal(false);
  };

  function currencyFormat(num) {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }

  const onFinish = (values) => {
    const product = {
      _id: _id,
      name: name,
      price: price,
      image: image[0],
      sizeSelected: values.size,
      size: size,
      quantity: values.quantity,
      select: false
    }
    const productsSesstion = JSON.parse(window.sessionStorage.getItem("cart"))
      ? JSON.parse(window.sessionStorage.getItem("cart"))
      : [];
    productsSesstion.push(product)
    window.sessionStorage.setItem("cart", JSON.stringify(productsSesstion));
    dispatch(setQuantityCart());
    setVisibleModal(false);
  };
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      size: "",
      quantity: 1,
    });
    return () => {
      form.resetFields();
    };
  }, []);
  return (
    <Modal
      forceRender
      visible={visible}
      footer={false}
      onCancel={handleCancel}
      width={"fit-content"}
    >
      <div className="modal-main">
        <div className="wrapper-swiper">
          <SwiperImg images={props.images} />
        </div>
        <div className="wapper-content">
          <h4 className="product-name">{name}</h4>
          <p className="product-price">{currencyFormat(price.toString())}</p>
          <p className="product-des">{description}</p>
          <div className="container-add_to_cart">
            <Form
              form={form}
              requiredMark={false}
              layout="vertical"
              onFinish={onFinish}
            >
              <RadioButtonField
                name="size"
                label="Size"
                rules={[{ required: true }]}
                options={size}
              />
              <Form.Item label="Quantity" labelAlign="left">
                <Button
                  onClick={() => {
                    const quantity = form.getFieldValue("quantity");
                    if (quantity > 1) {
                      form.setFieldsValue({
                        quantity: quantity - 1,
                      });
                    }
                  }}
                >
                  -
                </Button>
                <Form.Item name="quantity" noStyle>
                  <InputNumber />
                </Form.Item>

                <Button
                  onClick={() => {
                    const quantity = form.getFieldValue("quantity");
                    form.setFieldsValue({
                      quantity: quantity + 1,
                    });
                  }}
                >
                  +
                </Button>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                ADD TO CART
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Modal1;
