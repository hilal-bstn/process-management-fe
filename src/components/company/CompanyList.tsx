import React, { useEffect, useState } from 'react';
import { Button, Empty, Form, Input, Modal, Space, Table, Tooltip } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import AddCompanyModal from './modals/AddCompanyModal';
import CompanyService from '../../services/companyService';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { CompanyModel } from '../../models/companyModel';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const { confirm } = Modal;


const onChange: TableProps<DataType>['onChange'] = ( extra) => {
  console.log('params', extra);
};

const CompanyList: React.FC = () => {
  const [companies,setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[companyName,setCompanyName]=React.useState('');
  const[companyLegalNumber,setCompanyLegalNumber]=React.useState('');
  const[incorporationCountry,setTncorporationCountry]=React.useState('');
  const[website,setWebsite] = React.useState('');
  const[id,setId]=React.useState('');

  useEffect(() => {
    getCompanies();
},[]);

const getCompanies = async () => {
  let companyService = new CompanyService();
  let companyResult = await companyService.companies();
  
  if(companyResult.length>0)
  {      
    setCompanies(companyResult);    
  }
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    width: '30%',
  },
  {
    title: 'Company Legal Number',
    dataIndex: 'companyLegalNumber',
    width: '30%'
  },
  {
    title: 'Incorporation Country',
    dataIndex: 'incorporationCountry',
    width: '20%',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    width: '10%',
  },
  {
    title: 'Edit',
    dataIndex: 'operation',
    render: (index,record) => (
      <Button shape="circle" title="Edit" icon={<EditOutlined />} onClick={() => showModal(record)}/>)
  ,
  },
  {
    title: 'Delete',
    dataIndex: 'operation',
    render: (index,record) => <Tooltip title="Delete">
                      <Space wrap>
                        <Button onClick={() =>showDeleteConfirm(record)} shape="circle" className='delete-button' icon={<DeleteOutlined/>} />
                      </Space>                   
                    </Tooltip>,

  }
];

const showDeleteConfirm = (record:any) => {
  confirm({
    title: 'Are you sure delete this company?',
    icon: <ExclamationCircleOutlined />,
    content: 'Transaction cannot be undone after confirmation.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      const companyService = new CompanyService();
      companyService.companyDelete(record._id);
      getCompanies();
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const showModal = (record:any) => {          
      setCompanyName(record.companyName);
      setCompanyLegalNumber(record.companyLegalNumber);
      setTncorporationCountry(record.incorporationCountry);
      setWebsite(record.website);
      setId(record._id)
      setIsModalOpen(true);
};

const handleOk = () => {     

  const companyService = new CompanyService();
  const companyModel : CompanyModel = {companyName:companyName,companyLegalNumber:companyLegalNumber,incorporationCountry:incorporationCountry,website:website}
              
  companyService.companyUpdate(companyModel,id)  
    setIsModalOpen(false);
    getCompanies();
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values: any) => {
      console.log(values);
    
};

return  (
        <div>
            <h1 className='table-title'>Companies
            <br/>
            <AddCompanyModal/>
            </h1>
            <Table locale={{ emptyText: (<Empty/>)}} columns={columns} dataSource={companies} onChange={onChange} pagination={false} />
            
            <Modal title="Company Update" open={isModalOpen} onOk={handleOk}   onCancel={handleCancel}>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} className='model-form'>
              
                  <Form.Item label="Name" rules={[{ required: true , message: 'Please input your username!' }]}>
                    <Input value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
                  </Form.Item>
                  
                  <Form.Item  label="Legal Number" rules={[{ required: true  }]}>
                    <Input value={companyLegalNumber} onChange={(e)=>setCompanyLegalNumber(e.target.value)}/>
                  </Form.Item>
                  
                  <Form.Item  label="Country" rules={[{ type: 'number', min: 0,required: true  }]}>
                    <Input value={incorporationCountry} onChange={(e)=>setTncorporationCountry(e.target.value)}/>
                  </Form.Item>
                  
                  <Form.Item  label="Website" rules={[{ min: 0,required: true  }]}>
                     <Input value={website} onChange={(e)=>setWebsite(e.target.value)}/>
                  </Form.Item>
          
                </Form>
            </Modal>
        </div>)
};

export default CompanyList;