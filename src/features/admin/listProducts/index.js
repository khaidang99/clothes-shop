import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Tag, Space, Image, Popconfirm, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { fetchAllProducts, deleteProduct } from "features/products/ProductsSlice";

function ListProducts() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (images) => <Image width={50} src={images[0]} />,
    },
    {
      title: "Categories",
      key: "category",
      dataIndex: "category",
      render: (categories) => (
        <>
          {categories.map((category) => {
            let color = "#8dcff8";
            return (
              <Tag color={color} key={category}>
                {category.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "CountInStock",
      dataIndex: "countInStock",
      key: "countInStock",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Options",
      key: "options",
      render: (text, record) => (
        <Space size="middle">
          <Link
            className="link-primary"
            to={`/admin/edit-product/${record._id}`}
            state={{kind: "edit"}}
          >
            Edit
          </Link>
          <Popconfirm
            title="Sure to cancel?"
            onConfirm={() => {
              handleConfirm(record._id);
            }}
          >
            <a className="link-danger">Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleConfirm = async (id) => {
    console.log(id);
    await dispatch(deleteProduct(id));
  };

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    async function fetchProducts() {
      dispatch(fetchAllProducts());
    }
    fetchProducts();
  }, []);
  return (
    <Table
      className="shadow p-3 mb-5 bg-body rounded"
      columns={columns}
      dataSource={products}
      rowKey={"_id"}
    />
  );
}

export default ListProducts;
