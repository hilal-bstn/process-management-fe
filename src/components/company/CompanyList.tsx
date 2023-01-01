import React, { useEffect, useState } from 'react';
import { Button, Empty, Form, Input, Modal, Space, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import CompanyService from '../../services/companyService';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import { CompanyModel } from '../../models/companyModel';
import { CompanyTbl } from '../../models/tableModels/companyTbl';
import NotificationService from '../../services/notificationService';


const { confirm } = Modal;


const CompanyList: React.FC = () => {

  const [form] = Form.useForm();
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id,setId] = React.useState('');
  const [isModalUpdate, setIsModalUpdate] = useState(false);

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

const columns: ColumnsType<CompanyTbl> = [
  {
    title: 'Company Name',
    dataIndex: 'companyName',
    width: '30%',
    key: 'companyName',
    sorter: (a, b) => a.companyName.length - b.companyName.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Company Legal Number',
    dataIndex: 'companyLegalNumber',
    width: '30%',
    key: 'companyLegalNumber',
    sorter: (a, b) => a.companyLegalNumber.length - b.companyLegalNumber.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Incorporation Country',
    dataIndex: 'incorporationCountry',
    width: '20%',
    key: 'incorporationCountry',
    sorter: (a, b) => a.incorporationCountry.length - b.incorporationCountry.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Website',
    dataIndex: 'website',
    width: '10%',
    key: 'website',
    sorter: (a, b) => a.website.length - b.website.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Edit',
    key: 'edit',
    render: (index,record) => (
      <Button shape="circle" className='edit-button' title="Edit" icon={<EditOutlined />} onClick={() => showModal(record)}/>)
  ,
  },
  {
    title: 'Delete',
    key: 'delete',
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
        NotificationService.openSuccessNotification({description:"Record successfully deleted!",placement:"bottomRight",title:""});  
        getCompanies();
      },
      onCancel() {},
    });
};

const validateMessages = {
  required: '${label} is required!'
};

const showModal = (record:any) => {  
      if(record._id)
      {     
        setIsModalUpdate(true);        
        setId(record._id);            
      }
      else{
        setIsModalUpdate(false);        
      }
      form.setFieldsValue({
        companyName: record.companyName,
        companyLegalNumber: record.companyLegalNumber,
        incorporationCountry: record.incorporationCountry,
        website:record.website
      });

      setIsModalOpen(true);   
};

    const onFinish = (values: any) => {
      const companyService = new CompanyService();
      const companyModel : CompanyModel = {
        companyName: values.companyName,
        companyLegalNumber: values.companyLegalNumber,
        incorporationCountry: values.incorporationCountry,
        website: values.website}
        
        if(isModalUpdate)
        {
          companyService.companyUpdate(companyModel,id);
          NotificationService.openSuccessNotification({description:"Record successfully updated!",placement:"bottomRight",title:""});  
        }
        else{
          companyService.companyAdd(companyModel);
          NotificationService.openSuccessNotification({description:"Record successfully added!",placement:"bottomRight",title:""});  
        }

      setIsModalOpen(false);
      getCompanies();
    };
  
    const onFinishFailed = (errorInfo: any) => {
      NotificationService.openErrorNotification({description:"Required fields cannot be empty!",placement:"bottomRight",title:"Invalid Form"});
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const searchHandle = async(event:any) => {
      let key = event.target.value;      
      const companyService = new CompanyService();
      if(key){
          let result = await companyService.search(key)
          if(result)
          {
              setCompanies(result);
          }
      }
      else{
          getCompanies();
      }
    }
    
return (
        <div>
          
            <h1 className='table-title'>Companies
            <Tooltip title="Add Company">
                <Button className='add-button' shape="circle" icon={<PlusOutlined className='add-icon'/>} onClick={showModal}/>
            </Tooltip><br/>
            <Input onChange={searchHandle} size="large" className='search' placeholder="Search by name,legal number or country..." prefix={<SearchOutlined className='search-icon'/>} />
            </h1>
            <Table locale={{ emptyText: (<Empty/>)}} columns={columns} dataSource={companies} pagination={false}/>
            
            <Modal 
              title = {isModalUpdate ?"Company Update":"Company Add"} 
              open={isModalOpen} 
              onCancel={handleCancel} 
              footer={null}>

                <Form 
                  name="nest-messages"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  form={form}
                  validateMessages={validateMessages}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  >

                  <Form.Item 
                        label="Name" 
                        name="companyName" 
                        rules={[{ required: true }]}
                        >
                    <Input/>
                  </Form.Item>
                  
                  <Form.Item 
                        label="Legal Number"  
                        name="companyLegalNumber" 
                        rules={[{ required: true  }]}
                        >
                    <Input/>
                  </Form.Item>
                  
                  <Form.Item 
                        label="Country" 
                        name="incorporationCountry" 
                        rules={[{ required: true  }]}
                        >
                    <Input/>
                  </Form.Item>
                  
                  <Form.Item 
                        label="Website" 
                        name="website" 
                        rules={[{ required: true  }]}
                        >
                     <Input/>
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

export default CompanyList;