import React from 'react';
import { Form, Button } from 'antd';
import InputField from 'custom-fields/input/InputField';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router";

import {fetchLogin} from './LoginSlice';

function Login() {
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    const valueForm = {
        email: '',
        password: ''
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = async (values) => {
        await dispatch(fetchLogin(values))
        navigate(location.state? location.state.from.pathname : "/")
    }

    return (
        <div className='page-login pt-5'>
            <Form
                onFinish={onFinish}
                initialValues={valueForm}
                validateMessages={validateMessages}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
            >
                <InputField
                    name="email"
                    label="email"
                    placeholder="email"
                    type="email"
                    rules={[{ required: true}]}
                />
                <InputField
                    name="password"
                    label="password"
                    placeholder="password"
                    rules={[{ required: true}]}
                    type="password"
                />
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login
