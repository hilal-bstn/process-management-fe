import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, SelectProps, Tooltip } from 'antd';
import { EditOutlined} from '@ant-design/icons';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import {PlusOutlined} from '@ant-design/icons';
import CompanyService from '../../../services/companyService';
import { CompanyModel } from '../../../models/companyModel';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  /* eslint-disable no-template-curly-in-string */
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

const AddCompanyModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[companyName,setCompanyName]=React.useState('');
  const[companyLegalNumber,setCompanyLegalNumber]=React.useState('');
  const[incorporationCountry,setTncorporationCountry]=React.useState('');
  const[website,setWebsite] = React.useState('');

  const showModal = () => {
    setCompanyName('');
    setCompanyLegalNumber('');
    setTncorporationCountry('');
    setWebsite('');
    setIsModalOpen(true);
  };

  const handleOk = () => {
    let companyService = new CompanyService();
    const companyModel : CompanyModel = {companyName:companyName,companyLegalNumber:companyLegalNumber,incorporationCountry:incorporationCountry,website:website}
                
    companyService.companyAdd(companyModel)  
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
    <Tooltip title="Add Company">
        <Button className='add-button' shape="circle" icon={<PlusOutlined />} onClick={showModal}/>
    </Tooltip>
      <Modal title="Company Add" open={isModalOpen} onOk={handleOk}   onCancel={handleCancel}>
        <Form {...layout} name="nest-messages" 
                initialValues={{ remember: true }}
                validateMessages={validateMessages} className='model-form'
                >
                              
              <Form.Item label="Name" rules={[{ required: true , message: 'Please input your name!' }]}>
                <Input value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
              </Form.Item>
              
              <Form.Item  label="Legal Number" rules={[{ required: true, message: 'Please input your legal number!'   }]}>
                <Input value={companyLegalNumber} onChange={(e)=>setCompanyLegalNumber(e.target.value)}/>
              </Form.Item>
              
              <Form.Item  label="Country" rules={[{ required: true , message: 'Please input your country!' }]}>
                <Input value={incorporationCountry} onChange={(e)=>setTncorporationCountry(e.target.value)}/>
              </Form.Item>
              
              <Form.Item  label="Website">
                 <Input value={website} onChange={(e)=>setWebsite(e.target.value)}/>
              </Form.Item>
      
        </Form>
      </Modal>
    </>
  );
};

export default AddCompanyModal;