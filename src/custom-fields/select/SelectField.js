import React from "react";
import PropTypes from "prop-types";
import { Form, Select } from "antd";

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array,
  rules: PropTypes.array,
  mode: PropTypes.string,
  onChangeSelect: PropTypes.func,
};

SelectField.defaultProps = {
  label: "",
  placeholder: "",
  disabled: false,
  options: [],
  rules: [],
  mode: "",
};

function SelectField(props) {
  const { Option } = Select;

  const {
    options,
    label,
    placeholder,
    disabled,
    name,
    rules,
    mode,
    onChangeSelect,
  } = props;

  const children = options.map((item) => (
    <Option key={item.name}>{item.name}</Option>
  ));

  function handleChange(value) {
    if (onChangeSelect) {
      onChangeSelect(value)
    }
  }

  return (
    <Form.Item
      label={label}
      name={name}
      id={name}
      disabled={disabled}
      rules={rules}
      autoComplete="off"
    >
      <Select
        mode={mode}
        allowClear
        showSearch
        style={{ width: "100%" }}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete="off"
        filterOption={(input, option) =>
          option.children
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .indexOf(
              input
                .toLowerCase()
                .normalize("NFD")
                .replace(/\p{Diacritic}/gu, "")
            ) >= 0
        }
      >
        {children}
      </Select>
    </Form.Item>
  );
}

export default SelectField;
