import React, { useEffect, useState } from 'react';
import { Button, Empty, Form, Input, InputNumber, Modal, Select, Space, Table, Tooltip } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import ProductService from '../../services/productService';
import { EditOutlined,DeleteOutlined,ExclamationCircleOutlined,PlusOutlined} from '@ant-design/icons';
import CompanyService from '../../services/companyService';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ProductModel } from "../../models/productModel";
import { ProductTbl } from '../../models/tableModels/productTbl';
import NotificationService from '../../services/notificationService';

const { confirm } = Modal;

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ProductList: React.FC = () => {
  
      const [form] = Form.useForm();
      const [products, setProducts] = useState([]);
      const [companies, setCompanies] = useState([]as any[]);
      const [size, setSize] = useState<SizeType>('middle');
      const [id, setId] = React.useState('');
      const [isModalVisible, setIsModalVisible] = useState(false);
      const [isModalUpdate, setIsModalUpdate] = useState(false);

      useEffect(() => {
          getProducts();
          getCompanies();
      },[]);

      const getProducts = async () => {
        let productService = new ProductService();
        let productResult = await productService.products();
        
        if(productResult.length>0)
        {
          setProducts(productResult);    
        }
      }

      const getCompanies = async () => {
        let companyService = new CompanyService();
        let companyResult = await companyService.companies();
        
        if(companyResult)
        {      
          setCompanies(companyResult);}
      }

      const columns: ColumnsType<ProductTbl> = [
        {
          title: 'Name',
          dataIndex: 'name',
          width: '30%',
          key: 'name'
        },
        {
          title: 'Category',
          dataIndex: 'category',
          width: '10%',
          key: 'category'
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          width: '10%',
          key: 'amount'
        },
        {
          title: 'Amount Unit',
          dataIndex: 'amountUnit',
          width: '10%',
          key: 'amountUnit'
        },
        {
          title: 'Company',
          width: '40%',
          key: 'company',
          render: (record) => record.companyId?.companyName
        },
        {
          title: 'Edit',
          key: 'edit',
          render: (index,record) =>( 
            <Button shape="circle" className="edit-button" title="Edit" icon={<EditOutlined />} key={index} onClick={() => showModal(record)}/>)
        },
        {
          title: 'Delete',
          key: 'delete',
          render: (index,record) => 
                          <Tooltip title="Delete">
                            <Space wrap>
                              <Button onClick={() =>showDeleteConfirm(record)} key={index} shape="circle" className='delete-button' icon={<DeleteOutlined/>} />
                            </Space>                   
                          </Tooltip>,
      
        }
      ];

      const showDeleteConfirm = (record:any) => {
        confirm({
          title: 'Are you sure delete this product?',
          icon: <ExclamationCircleOutlined />,
          content: 'Transaction cannot be undone after confirmation.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            const productService = new ProductService();
            productService.productDelete(record._id);
            NotificationService.openSuccessNotification({description:"Record successfully deleted!",placement:"bottomRight",title:""});  
            getProducts();
          },
          onCancel() {},
        });
      };

      const showModal = (record:any|{}) => {  
        if(record._id)
        {     
          console.log(record);
          
          setIsModalUpdate(true);        
          setId(record._id);
          form.setFieldsValue({
            companyId: record.companyId._id
          });
        }
        
        else{
          setIsModalUpdate(false);        
        }
        form.setFieldsValue({
          name: record.name,
          category: record.category,
          amount: record.amount,
          amountUnit: record.amountUnit
        });

          setIsModalVisible(true);                                          
        };


        const handleChange = (value: string) => {
          form.setFieldsValue({
            companyId: value.toString()
          });
        };

        const onFinish = (values: any) => {
          const productService = new ProductService();
          const productModel : ProductModel = {
            name: values.name,
            amount: values.amount,
            amountUnit: values.amountUnit,
            category: values.category,
            companyId:values.companyId}
            if(isModalUpdate)
            {
              productService.productUpdate(productModel,id);
              NotificationService.openSuccessNotification({description:"Record successfully updated!",placement:"bottomRight",title:""});    
            }
            else{
              productService.productAdd(productModel); 
              NotificationService.openSuccessNotification({description:"Record successfully added!",placement:"bottomRight",title:""});   
            } 
    
            setIsModalVisible(false);
            getProducts();
        };
      
        const onFinishFailed = (errorInfo: any) => {
          NotificationService.openErrorNotification({description:"Required fields cannot be empty!",placement:"bottomRight",title:"Invalid Form"});
        };
    
        const handleCancel = () => {
          setIsModalVisible(false);
        };


        
    return ( 
        <div>
            <h1 className='table-title'>Products
              <br/>
              <Tooltip title="Add Product">
                <Button className='add-button' shape="circle" icon={<PlusOutlined />} onClick={showModal}/>
              </Tooltip>
            </h1>

            <Table locale={{ emptyText: (<Empty/>)}} columns={columns} dataSource={products} pagination={false}/>

            <Modal title = {isModalUpdate ?"Product Update":"Product Add"} 
              open={isModalVisible} 
              onCancel={handleCancel} 
              footer={null}>

                <Form name="nest-messages" 
                layout="vertical"
                initialValues={{ remember: true }}
                validateMessages={validateMessages}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className='model-form'>
                
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                  <Input/>
                </Form.Item>

                <Form.Item label="Category" name="category" rules={[{ required: true  }]}>
                  <Input/>
                </Form.Item>

                <Form.Item label="Amount" name="amount" rules={[{ type: 'number', min: 0, required: true  }]}>
                  <InputNumber/>
                </Form.Item>

                <Form.Item  label="Amount Unit" name="amountUnit" rules={[{ type: 'number', min: 0, required: true  }]}>
                  <InputNumber/>
                </Form.Item>

                <Form.Item label="Company" name="companyId" rules={[{ required: true }]}>  
                    <Select
                      onChange={handleChange}
                      size={size}
                      style={{ width: 200 }}
                    >
                      { companies.length>0 ?companies.map(option=>{ return (<Select.Option value={option._id} key={option._id}>{option.companyName}</Select.Option>)}):<Empty/>}
                    </Select>
                </Form.Item>

                  <Space className='modal-form'>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button onClick={handleCancel} >Cancel</Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit" >
                        Submit
                      </Button>
                    </Form.Item>
                  </Space>

              </Form>
            </Modal>
        </div>)
};

export default ProductList;