import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Space,
} from "antd";

import {
  fetchAllCategories,
  setLoading,
  fetchUpdateCategory,
  fetchDeleteCategory
} from "features/category/CategorySlice";

import type { RootState } from 'app/Store';

type typeEditCell = {
  [x: string]: any;
  editing: any;
  dataIndex: any;
  title: any;
  inputType: any;
  record: any;
  index: any;
  children: any;
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: typeEditCell) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const { categories } = useSelector((state: RootState) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCategories() {
      dispatch(fetchAllCategories());
    }
    fetchCategories();
    return () => {
      dispatch(setLoading("pending"));
    };
  }, []);

  const isEditing = (record: any) => record._id === editingKey;

  const handleConfirm = (id: string) => {
    console.log(id);
    dispatch(fetchDeleteCategory(id))
    console.log("confirm");
  };

  const edit = (record: any) => {
    form.setFieldsValue({
      name: "",
      ...record,
    });
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id: string) => {
    const { name } = await form.validateFields();
    try {
      await dispatch(fetchUpdateCategory({ id, name }));
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "50%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Space size={"large"}>
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => {
                  handleConfirm(record._id);
                }}
              >
                <a className="link-danger">Delete</a>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        className="shadow p-3 mb-5 bg-body rounded"  
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={categories}
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey={"_id"}
      />
    </Form>
  );
};

function ListCategories() {
  return <EditableTable/>;
}

export default ListCategories;
