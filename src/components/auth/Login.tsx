import React, { useEffect } from "react";
import { Button, Form, Input, Space } from 'antd';
import { LockOutlined, UserOutlined ,LoginOutlined} from '@ant-design/icons';
import ProcessManagement from "../layouts/ProcessManagement";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/userService";
import { LoginModel } from "../../models/loginModel";
import NotificationService from "../../services/notificationService";

    const Login: React.FC = () => {
        const onFinish = (values: any) => {};
        const [email, setEmail] = React.useState('');
        const [password, setPassword] = React.useState('');

        const navigate=useNavigate();

        useEffect(() => {
            const auth = localStorage.getItem('user');
            if(auth)
            {
                navigate('/')
            }
        })
        
        const handleLogin = async() => {
            let userService = new UserService();
            let userModel : LoginModel = {
                email: email,
                password: password}

            let loginResult = await userService.login(userModel);

            if(loginResult.user !== undefined){
                
               localStorage.setItem("user",JSON.stringify(loginResult.user));
               localStorage.setItem("token",JSON.stringify(loginResult.auth));
               NotificationService.openSuccessNotification({description:"Successful Login.",placement:"bottomRight",title:""});

                navigate("/");
            }
            else{
                NotificationService.openErrorNotification({description:"Email or password is incorrect!",placement:"bottomRight",title:""});
            }
        };
  
    return (
      <div>                
            <ProcessManagement/>
            
            <div className="auth-div">
          
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish} 
                    >

                    <h1 className='auth-title'> Sign in to your acount </h1>

                    <Form.Item
                    name="email"  
                    rules={[{ type:'email', required: true, message: 'Please input your Email!' }]}
                    >
                    <Input 
                    className='inputBox-auth' 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    type="email"
                    placeholder="Email" 
                    onChange={(e)=>setEmail(e.target.value)} value={email}/>       
                    </Form.Item>
                    
                    <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                    <Input
                    className='inputBox-auth'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        onChange={(e)=>setPassword(e.target.value)} value={password}
                    />
                    </Form.Item>

                    <Form.Item>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button onClick={handleLogin} icon={<LoginOutlined/>} block>Sign In</Button>
                        </Space>
                        
                        No Account? <a href="/register">Create One!</a>
                    </Form.Item>
                </Form>
      
            </div>
      </div>
    );
  };
  
  export default Login;