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
  useSizeQuery,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} from "features/size/SizeSlice";

type TypeEditableCell = {
  [x: string]: any;
  editing: any;
  dataIndex: any;
  title: any;
  inputType: any;
  record: any;
  index: any;
  children: any;
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: TypeEditableCell) => {
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
  const { data } = useSizeQuery({_id:"", name:"", value:""});
  const [updateSize] = useUpdateSizeMutation();
  const [deleteSize] = useDeleteSizeMutation();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: {_id: string}) => record._id === editingKey;

  const handleConfirm = async (id:string) => {
    await deleteSize(id);
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

  const save = async (_id: string) => {
    const { name } = await form.validateFields();
    try {
      await updateSize({ _id, name });
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
        rowKey={"_id"}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
      />
    </Form>
  );
};

function ListSizes() {
  return <EditableTable />;
}

export default ListSizes;
