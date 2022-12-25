import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import { DeleteOutlined} from '@ant-design/icons';


const { confirm } = Modal;

const showDeleteConfirm = () => {
  confirm({
    title: 'Are you sure delete this company?',
    icon: <ExclamationCircleOutlined />,
    content: 'Transaction cannot be undone after confirmation.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const DeleteCompanyModal: React.FC = () => (
  <Space wrap>
    <Button onClick={showDeleteConfirm} shape="circle" className='delete-button' icon={<DeleteOutlined/>} />
  </Space>
);

export default DeleteCompanyModal;