import React, { useEffect, useState } from 'react';
import { Button, Empty, Form, Input, InputNumber, Modal, Select, Space, Table, Tooltip } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import ProductService from '../../services/productService';
import { EditOutlined,DeleteOutlined,ExclamationCircleOutlined,PlusOutlined} from '@ant-design/icons';
import CompanyService from '../../services/companyService';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { ProductModel } from "../../models/productModel";
import { ProductTbl } from '../../models/tableModels/productTbl';

const { confirm } = Modal;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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

const onChange: TableProps<ProductTbl>['onChange'] = (extra) => {
  console.log('params', extra);
};

const ProductList: React.FC = () => {
  
      const [products, setProducts] = useState([]);
      const [companies, setCompanies] = useState([]as any[]);
      const [size, setSize] = useState<SizeType>('middle');
      const [name,setName] = React.useState('');
      const [category,setCategory] = React.useState('');
      const [amount, setAmount] = React.useState('');
      const [amountUnit, setAmountUnit] = React.useState('');
      const [companyId, setCompanyId] = React.useState('');
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
          setCompanies(companyResult);    
          console.log(companyResult);

        }
      }

      const columns: ColumnsType<ProductTbl> = [
        {
          title: 'Name',
          dataIndex: 'name',
          width: '30%',
        },
        {
          title: 'Category',
          dataIndex: 'category',
          width: '10%'
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          width: '10%',
        },
        {
          title: 'Amount Unit',
          dataIndex: 'amountUnit',
          width: '10%',
        },
        {
          title: 'Company',
          width: '40%',
          render: (record) => record.companyId?.companyName
        },
        {
          title: 'Edit',
          dataIndex: 'operation',
          render: (index,record) =>( 
          <Button shape="circle" title="Edit" icon={<EditOutlined />} onClick={() => showModal(record)}/>)
        },
        {
          title: 'Delete',
          dataIndex: 'operation',
          render: (index,record) => 
                          <Tooltip title="Delete">
                            <Space wrap>
                              <Button onClick={() =>showDeleteConfirm(record)} shape="circle" className='delete-button' icon={<DeleteOutlined/>} />
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
            getProducts();
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

      const showModal = (record:any|{}) => {  
        if(record._id)
        {     
          setIsModalUpdate(true);        
          setId(record._id);
          setCompanyId(record.companyId._id);            
        }
        
        else{
          setIsModalUpdate(false);        
        }
        
          setName(record.name);
          setCategory(record.category);
          setAmount(record.amount);
          setAmountUnit(record.amountUnit);

          setIsModalVisible(true);                                          
        };

        const handleOk = () => {     
          const productService = new ProductService();
          
          const productModel : ProductModel = {name:name,amount:+amount,amountUnit:+amountUnit,category:category,companyId:companyId}
          if(isModalUpdate)
          {
            productService.productUpdate(productModel,id)  
          }
          else{
            productService.productAdd(productModel)  
          }

          setIsModalVisible(false);
          getProducts();
        };
      
        const handleCancel = () => {
          setIsModalVisible(false);
        };

        const handleChange = (value: string) => {
          setCompanyId(value.toString());
          console.log(companyId);
        };
        
    return ( 
        <div>
            <h1 className='table-title'>Products
              <br/>
              <Tooltip title="Add Product">
                <Button className='add-button' shape="circle" icon={<PlusOutlined />} onClick={showModal}/>
              </Tooltip>
            </h1>

            <Table locale={{ emptyText: (<Empty/>)}} columns={columns} dataSource={products} onChange={onChange} pagination={false} />

            <Modal title="Product Update" open={isModalVisible} onOk={handleOk}   onCancel={handleCancel}>

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
                      defaultValue={companyId}
                      size={size}
                      onChange={handleChange}
                      style={{ width: 200 }}
                    >
                      { companies.length>0 ?companies.map(option=>{ return (<Select.Option value={option._id}>{option.companyName}</Select.Option>)}):<Empty/>}
                    </Select>
                </Form.Item>

              </Form>
            </Modal>
        </div>)
};

export default ProductList;