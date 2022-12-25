import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select, SelectProps } from 'antd';
import { EditOutlined} from '@ant-design/icons';
import { SizeType } from 'antd/es/config-provider/SizeContext';


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
  

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

const UpdateCompanyModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
  const [size, setSize] = useState<SizeType>('middle');

  return (
    <>
      <Button shape="circle" title="Edit" icon={<EditOutlined />} onClick={showModal}/>
      <Modal title="Company Add" open={isModalOpen} onOk={handleOk}   onCancel={handleCancel}>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} className='model-form'>
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Category" rules={[{ required: true  }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="Amount" rules={[{ type: 'number', min: 0,required: true  }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Amount Unit" rules={[{ type: 'number', min: 0,required: true  }]}>
      <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="Company" rules={[{ required: true }]}>
      <Select
        size={size}
        defaultValue="a1"
        onChange={handleChange}
        style={{ width: 200 }}
        options={options}
      />
      </Form.Item>
    </Form>
      </Modal>
    </>
  );
};

export default UpdateCompanyModal;