import React from "react";
import { Form, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam, } from 'antd/lib/upload';
import { UploadFile } from "antd/lib/upload/interface";

type Props = {
  label: string,
  disabled?: boolean,
  name: string,
  rules: [{required: boolean}]
}

function UploadImg(props: Props) {
  const { label, disabled, name, rules } = props;

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  function beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }
  const handleChange = ({ fileList }: UploadChangeParam<UploadFile<any>>) => console.log(fileList);

  return (
    <Form.Item
      name={name}
      label={label}
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={rules}
    >
      <Upload
        onChange={handleChange}
        name="logo"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture"
        maxCount={4}
        beforeUpload={beforeUpload}
        disabled={disabled}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Form.Item>
  );
}

export default UploadImg;
