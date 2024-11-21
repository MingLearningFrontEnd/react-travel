import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './RegisterForm.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    confirm?: string
};


export function RegiserForm() {
    const navigate = useNavigate()

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            await axios.post('http://82.157.43.234:8080/auth/register',{
                email: values.username,
                password: values.password,
                confirmPassword: values.confirm,
            })
            navigate('/login/')
        } catch (error) {
            alert('注册失败')
        }
   
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={styles['register-form']}
        >
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>


            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item<FieldType>
                label="Confirm Password"
                name="confirm"
                rules={[
                    { required: true, message: 'Please input your confirm password!' },
                    (({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject('密码确认不一致')
                        }
                    }))
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>


            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    );
}

