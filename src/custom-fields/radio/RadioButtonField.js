import React from "react";
import { Radio, Form, Space } from "antd";
import PropTypes from 'prop-types';

RadioButtonField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  rules: PropTypes.array,
}

RadioButtonField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
  rules: [],
};

function RadioButtonField(props) {
  const { options, label, disabled, name, rules } = props;

  const onChange = (e) => {
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
