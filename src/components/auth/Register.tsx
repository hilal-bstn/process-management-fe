import { Button, Form, Input, Space } from "antd";
import { LockOutlined, UserOutlined,UserAddOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import ProcessManagement from "../layouts/ProcessManagement";
import { RegisterModel } from "../../models/registerModel";
import UserService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import NotificationService from "../../services/notificationService";

const Register : React.FC = () => {
      const [username,setUserName]=useState('');
      const [password,setPassword]=useState('');
      const [email,setEmail]=useState('');
    
      const navigate=useNavigate();
      useEffect(()=>{
          const auth=localStorage.getItem('user');
          if(auth)
          {
              navigate('/')
          }
      })  

      const collectData = async ()=>{ 

         let userService = new UserService();
            let registerModel : RegisterModel = {
                email:email,
                password:password,
                username:username
            }
      if(email.length>0 && username.length>0){
       let result = await userService.register(registerModel);
       
       if(result.auth){
                
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));
        NotificationService.openSuccessNotification({description:"Successful Register.",placement:"bottomRight",title:""});

         navigate("/");
     }
     else{
        NotificationService.openErrorNotification({description:"Something went wrong, please trg after sometime.",placement:"bottomRight",title:""});
     }
    }
        else{
            NotificationService.openErrorNotification({description:"Please enter connect details.",placement:"bottomRight",title:"Form Invalid!"});
        }
    }

      return (
        <div>        
              
            <ProcessManagement/>

            <div className="auth-div">
            
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                >
                    <h1 className='auth-title'>Create a New Account</h1>
            
                    <Form.Item
                    name="username"      
                    rules={[{ required: true, message: 'Please input your UserName!' }]}
                    >
                    <Input 
                    className='inputBox-auth' 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Username" 
                    value={username} onChange={(e)=>setUserName(e.target.value)}/>
                
                    </Form.Item>
                
                    <Form.Item
                        name="email"      
                        rules={[{ type:'email',required: true, message: 'Please input your Email!' }]}
                    >
                        <Input 
                        className='inputBox-auth' 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Email" 
                        value={email} onChange={(e)=>setEmail(e.target.value)}/>
                
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
                        value={password} onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button onClick={collectData} icon={<UserAddOutlined />} block>Sign up</Button>
                        </Space>

                    Do you have an account? <a href="/login"> Login!</a>
                    </Form.Item>

                </Form>  
            </div>
        </div>
      );
    };

export default Register;