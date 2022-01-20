import React from "react";
import { Form, Select } from "antd";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  options: [{ value: string; name: string }] | {name: string, code: string}[];
  rules?: [{ required: boolean }];
  mode?: "multiple" | "tags" | undefined;
  onChangeSelect?: (value: string) => void;
};

function SelectField(props: Props) {
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

  function handleChange(value: string) {
    if (onChangeSelect) {
      onChangeSelect(value);
    }
  }

  return (
    <Form.Item label={label} name={name} id={name} rules={rules}>
      <Select
        mode={mode}
        allowClear
        showSearch
        disabled={disabled}
        style={{ width: "100%" }}
        placeholder={placeholder}
        onChange={handleChange}
        filterOption={(
          input: string,
          option: { children: string } = { children: "" }
        ) =>
          option?.children
            ?.toLowerCase()
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
