import React from 'react';
import { Form, InputNumber } from 'antd';
import PropTypes from 'prop-types';

InputNumberField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    rules: PropTypes.array,
    selectBefore: PropTypes.element,
    selectAfter: PropTypes.element
};

InputNumberField.defaultProps = {
    type: 'number',
    label: '',
    placeholder: '',
    disabled: false,
    rules: [],
    selectBefore: <></>,
    selectAfter: <></>,
};


function InputNumberField(props) {
    const {
        name, type, label, placeholder, disabled, rules, selectBefore, selectAfter
    } = props;

    return (
        <Form.Item
            label={label}
            name={name}
            id={name}
            disabled={disabled}
            rules={rules}
        >
            <InputNumber 
                type={type}
                placeholder={placeholder}
                addonBefore={selectBefore}
                addonAfter={selectAfter}
            />
        </Form.Item>
    )
}

export default InputNumberField
