import React from "react";
import { Form, InputNumber } from "antd";
import { Rule } from "antd/lib/form";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  rules: [{ required: boolean, min?: number, type?: "string"| "number"}],
};

function InputNumberField(props: Props) {
  const { name, label, placeholder, disabled, rules } = props;

  return (
    <Form.Item label={label} name={name} id={name} rules={rules}>
      <InputNumber disabled={disabled} type={"number"} placeholder={placeholder} />
    </Form.Item>
  );
}

export default InputNumberField;
