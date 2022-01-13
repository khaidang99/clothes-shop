import React from 'react';
import PropTypes from 'prop-types';
import { Form, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

UploadImg.propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    rules: PropTypes.array,
};

UploadImg.defaultProps = {
    label: '',
    disabled: false,
    rules: [],
};


function UploadImg(props) {
    const {
        label, disabled, name, rules
    } = props;

    const normFile = (e) => {
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
    };

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    return (
        <Form.Item
            name={name}
            label={label}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={rules}
        >
            <Upload
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
    )
}

export default UploadImg
