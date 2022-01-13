import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

InputField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    rules: PropTypes.array
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
    rules: []
};

function InputField(props) {
    const {
        name, type, label, placeholder, disabled, rules
    } = props;

    return (
        <Form.Item
            label={label}
            name={name}
            id={name}
            disabled={disabled}
            rules={rules}
        >
            <Input 
                type={type}
                placeholder={placeholder}
            />
        </Form.Item>
    )
}

export default InputField
