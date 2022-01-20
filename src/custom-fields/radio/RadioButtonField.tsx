import React from "react";
import { Radio, Form, Space } from "antd";
import { RadioChangeEvent } from 'antd/lib/radio';

type Props = {
  name: string,
  label: string,
  disabled?: boolean,
  options: string[],
  rules: [{required: boolean}]
}

function RadioButtonField(props: Props) {
  const { options, label, disabled = false, name, rules } = props;

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
  };

  const listRadio = options.map((option) => (
    <Radio.Button key={option} value={option}>{option}</Radio.Button>
  ));

  return (
    <div>
      <Form.Item label={label} name={name} rules={rules} labelAlign="left" > 
        <Radio.Group disabled={disabled} onChange={onChange}>
          <Space>{listRadio}</Space>
        </Radio.Group>
      </Form.Item>
    </div>
  );
}

export default RadioButtonField;
