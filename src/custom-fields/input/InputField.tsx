import React from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

type Props = {
  name: string,
  type?: string,
  label: string,
  placeholder: string,
  disabled?: boolean,
  rules : [{ required: boolean}],
}

function InputField(props : Props) {
  const { name, type, label, placeholder, disabled, rules } = props;

  return (
    <Form.Item
      label={label}
      name={name}
      id={name}
      rules={rules}
    >
      <Input disabled={disabled} type={type} placeholder={placeholder} />
    </Form.Item>
  );
}

export default InputField;
