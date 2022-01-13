import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, Input, Alert } from "antd";

ModalCreate.propTypes = {
  kind: PropTypes.string.isRequired,
  handleCreate: PropTypes.func,
};

function ModalCreate(props) {
  const [statusRespon, setStatusRespon] = useState(true);
  const { isModalVisible, setIsModalVisible, kind, handleCreate } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: "",
    });
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async ({ name }) => {
    const res = await handleCreate({ kind, name });
    if (res === true) {
      setIsModalVisible(false);
      form.setFieldsValue({
        name: "",
      });
    } else {
      setStatusRespon(true);
    }
  };

  const titleModal = `Create ${kind}`;
  return (
    <>
      <Modal
        forceRender
        title={titleModal}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" danger ghost onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="create" type="primary" onClick={() => form.submit()}>
            Create
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ name: "" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
        {!statusRespon ? (
          <Alert className="mb-2" message="Create fail!" type="error" />
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
}

export default ModalCreate;
