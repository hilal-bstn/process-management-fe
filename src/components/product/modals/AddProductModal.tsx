import React, { useEffect, useState } from 'react';
import { Button, Empty, Form, Input, InputNumber, Modal, Select, SelectProps, Tooltip } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import {PlusOutlined} from '@ant-design/icons';
import CompanyService from '../../../services/companyService';
import ProductService from '../../../services/productService';
import { ProductModel } from '../../../models/productModel';

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
  const options: SelectProps['options'] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  


const AddProductModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companies,setCompanies] = useState([]as any[]);
  const[name,setName]=React.useState('');
  const[category,setCategory]=React.useState('');
  const[amount,setAmount]=React.useState('');
  const[amountUnit,setAmountUnit]=React.useState('');
  const[companyId,setCompanyId] = React.useState('');
  const [size, setSize] = useState<SizeType>('middle');

  useEffect(() => {
    getCompanies();
},[]);


const getCompanies = async () => {
  let companyService = new CompanyService();
  let companyResult = await companyService.companies();
  
  if(companyResult)
  {      
    setCompanies(companyResult);    
  }
}

  const showModal = () => {
          setName('');
          setCategory('');
          setAmount('');
          setAmountUnit('');
          setCompanyId('');
    setIsModalOpen(true);
  };

  const handleOk = () => {
    let productService = new ProductService();
    const productModel : ProductModel = {name:name,amount:+amount,amountUnit:+amountUnit,category:category,companyId:companyId}
                
    productService.productAdd(productModel)  
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  
  const handleChange = (value: string) => {
    setCompanyId(value.toString());
  };

  return (
    <>
    <Tooltip title="Add Product">
        <Button className='add-button' shape="circle" icon={<PlusOutlined />} onClick={showModal}/>
    </Tooltip>
      <Modal title="Product Add" open={isModalOpen} onOk={handleOk}   onCancel={handleCancel}>
      <Form {...layout} name="nest-messages" 
                initialValues={{ remember: true }}
                validateMessages={validateMessages} className='model-form'>
                
                <Form.Item label="Name" rules={[{ required: true }]}>
                  <Input value={name} onChange={(e)=>setName(e.target.value)}/>
                </Form.Item>

                <Form.Item  label="Category" rules={[{ required: true  }]}>
                  <Input onChange={(e)=>setCategory(e.target.value)} value={category}/>
                </Form.Item>

                <Form.Item label="Amount" rules={[{ type: 'number', min: 0,required: true  }]}>
                  <InputNumber onChange={(e)=>setAmount(e!)} value={amount}/>
                </Form.Item>

                <Form.Item  label="Amount Unit" rules={[{ type: 'number', min: 0,required: true  }]}>
                <InputNumber onChange={(e)=>setAmountUnit(e!)} value={amountUnit}/>
                </Form.Item>

                <Form.Item label="Company" rules={[{ required: true }]}>  
                    <Select
                      size={size}
                      onChange={handleChange}
                      style={{ width: 200 }}
                    >
                      { companies.length>0 ?companies.map(option=>{ return (<Select.Option value={option._id}>{option.companyName}</Select.Option>)}):<Empty/>}
                    </Select>
                </Form.Item>

        </Form>
      </Modal>
    </>
  );
};

export default AddProductModal;