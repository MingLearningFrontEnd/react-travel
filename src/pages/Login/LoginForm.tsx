import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import styles from './LoginFrom.module.css'
import { loginIn } from '../../store/userSlice/userSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export function LoginFrom() {

  // const { error } = useSelector((state: any) => state.userSlice)
  const { token } = useSelector((state: any) => state.userSlice)
  const { loading } = useSelector((state: any) => state.userSlice)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  useEffect(() => {
  
      if (token) {
        navigate("/")
      }
    

  }, [token])


  const onFinish: FormProps<FieldType>['onFinish'] = (values: any) => {
    dispatch(loginIn({
      email: values.username,
      password: values.password
    }))
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
      className={styles['login-form']}
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

      <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={loading}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
}