import { Button, Col, Row, Space } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchCreateCategory } from "features/category/CategorySlice";
import { useAddSizeMutation } from "features/size/SizeSlice";

import ListCategories from "./listCategories/index";
import ListProducts from "./listProducts/index";
import ListSizes from "./listSizes/index";
import ModalCreate from "./modal/index";

const CONSTANT = {
  CATEGORY: "category",
  SIZE: "SIZE",
};

function Admin() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [kindCreate, setKindCreate] = useState("");
  const [addSize] = useAddSizeMutation();

  const dispatch = useDispatch();

  const handleCreateCategory = () => {
    setKindCreate(CONSTANT.CATEGORY);
    setIsModalVisible(true);
  };

  const handleCreateSize = () => {
    setKindCreate(CONSTANT.SIZE);
    setIsModalVisible(true);
  };

  const handleCreate = async (values: {
    name: string;
    kind: typeof CONSTANT.CATEGORY | typeof CONSTANT.SIZE;
  }) => {
    const { name } = values;
    if (values.kind === CONSTANT.CATEGORY) {
      try {
        await dispatch(fetchCreateCategory(name));
        return true;
      } catch {
        return false;
      }
    } else {
      try {
        await addSize({ name: name });
        return true;
      } catch {
        return false;
      }
    }
  };
  const to = {
    pathname: "/admin/create-product",
    state: { from: "/admin" },
  };
  return (
    <div className="p-xl-4 p-sm-2 mt-5">
      <Space className="pb-xl-3 pb-sm-2">
        <Button type="primary">
          <Link to={to}>Create Product</Link>
        </Button>
        <Button onClick={handleCreateCategory}>Create Category</Button>
        <Button type="dashed" onClick={handleCreateSize}>
          Create Size
        </Button>
      </Space>
      <Row gutter={[16, 16]}>
        <Col md={24} xl={16}>
          <ListProducts />
        </Col>
        <Col md={24} xl={4} span={4}>
          <ListCategories />
        </Col>
        <Col md={24} xl={4} span={4}>
          <ListSizes />
        </Col>
      </Row>

      <ModalCreate
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        kind={kindCreate}
        handleCreate={handleCreate}
      />
    </div>
  );
}

export default Admin;
