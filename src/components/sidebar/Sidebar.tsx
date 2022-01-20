import React from "react";
import { Form, Button, Checkbox, Row, Col, Input } from "antd";

import "./Sidebar.style.scss";

import { TypeFilterSibar } from 'types';
const { Search } = Input;

type Props = {
  sizes: [{value: string, name: string}] | [],
  categories: [{value: string, name: string}] | [],
  handleFilterSibar: (value: TypeFilterSibar) => void,
}

function Sidebar(props: Props) {
  const { sizes, categories, handleFilterSibar } = props;
  const [form] = Form.useForm();

  const onFinish = (values: TypeFilterSibar) => {
    handleFilterSibar(values)
  };

  const handleSearch = () => {
    form.submit();
  };

  const listSizes = sizes.map((size) => (
    <Col key={size.value} span={8}>
      <Checkbox onChange={handleSearch} value={size.name}>
        {size.name}
      </Checkbox>
    </Col>
  ));

  const listCategories = categories.map((category) => (
    <Col key={category.value} span={12}>
      <Checkbox onChange={handleSearch} value={category.name}>
        {category.name}
      </Checkbox>
    </Col>
  ));

  return (
    <div id="sidebar">
      <Form form={form} onFinish={onFinish}>
        <div className="wrapper wrapper-categories">
          <Form.Item name="name">
            <Search onSearch={handleSearch} allowClear placeholder="Search name" />
          </Form.Item>
        </div>
        <div className="wrapper wrapper-categories">
          <h3 className="title title-categories">CATEGORIES</h3>
          <div className="list list-categories">
            <Form.Item name="categories">
              <Checkbox.Group>
                <Row gutter={[0, 12]}>{listCategories}</Row>
              </Checkbox.Group>
            </Form.Item>
          </div>
        </div>
        <div className="wrapper wrapper-colors">
          <h3 className="title title-colors">COLORS</h3>
          <ul className="list list-colors row">
            <li className="item-color col-lg-6">
              <span className="color"></span>
              <span className="color-name">Beige</span>
            </li>
            <li className="item-color col-lg-6">
              <span className="color"></span>
              <span className="color-name">Beige</span>
            </li>
            <li className="item-color col-lg-6">
              <span className="color"></span>
              <span className="color-name">Beige</span>
            </li>
          </ul>
        </div>
        <div className="wrapper wrapper-sizes">
          <h3 className="title title-sizes">SIZES</h3>
          <div className="list list-sizes">
            <Form.Item name="sizes">
              <Checkbox.Group>
                <Row gutter={[0, 12]}>{listSizes}</Row>
              </Checkbox.Group>
            </Form.Item>
          </div>
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Sidebar;
