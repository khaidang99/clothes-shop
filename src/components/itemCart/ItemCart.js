import React from "react";
import {
  Row,
  Col,
  Checkbox,
  Image,
  Select,
  Button,
  InputNumber,
  Popover,
  Radio,
} from "antd";
import { DownOutlined } from "@ant-design/icons";

function ItemCart(props) {
  const {
    _id,
    name,
    image,
    size,
    sizeSelected,
    quantity,
    price,
    updateCart,
    deleteCart,
    select,
  } = props;
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  function currencyFormat(num) {
    return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }

  const setQuantity = (number) => {
    if (number <= 0) {
      return;
    }
    updateCart({
      _id,
      name,
      image,
      size,
      sizeSelected,
      quantity: number,
      price,
      select,
    });
  };

  const setSelectCart = () => {
    updateCart({
      _id,
      name,
      image,
      size,
      sizeSelected,
      quantity,
      price,
      select: !select,
    });
  };

  const content = () => {
    const listSize = size.map((size) => (
      <Radio.Button key={size} value={size}>
        {size}
      </Radio.Button>
    ));
    const onChange = (e) => {
      updateCart({
        _id,
        name,
        image,
        size,
        sizeSelected: e.target.value,
        quantity,
        price,
        select
      });
    };
    return (
      <Radio.Group onChange={onChange} defaultValue={sizeSelected}>
        {listSize}
      </Radio.Group>
    );
  };

  return (
    <div>
      <Row align="middle" className="p-3 border-bottom">
        <Col lg={1}>
          <Checkbox checked={select} onChange={setSelectCart} />
        </Col>
        <Col lg={3}>
          <Image width={80} src={image} />
        </Col>
        <Col lg={5}>{name}</Col>
        <Col lg={3}>
          <Popover
            placement="bottom"
            content={content}
            title="SIZE"
            trigger="click"
          >
            <a
              style={{ verticalAlign: "middle" }}
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Size <DownOutlined />
            </a>
          </Popover>
          <div>{sizeSelected}</div>
        </Col>
        <Col lg={3}>{currencyFormat(price.toString())}</Col>
        <Col lg={4}>
          <Button
            onClick={() => {
              setQuantity(quantity - 1);
            }}
            style={{ width: "30px", padding: 0 }}
          >
            -
          </Button>
          <InputNumber style={{ width: "40px" }} value={quantity} />
          <Button
            onClick={() => {
              setQuantity(quantity + 1);
            }}
            style={{ width: "30px", padding: 0 }}
          >
            +
          </Button>
        </Col>
        <Col lg={3}>{currencyFormat((price * quantity).toString())}</Col>
        <Col lg={1}>
          <a
            onClick={() => {
              deleteCart(_id);
            }}
            className="link-danger"
          >
            Delete
          </a>
        </Col>
      </Row>
    </div>
  );
}

export default ItemCart;
