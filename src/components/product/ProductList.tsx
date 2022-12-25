import React from 'react';
import { Button, Table, Tooltip } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import AddProductModal from './modals/AddProductModal';
import DeleteProductModal from './modals/DeleteProductModal';
import {PlusOutlined} from '@ant-design/icons';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '30%',
  },
  {
    title: 'Category',
    dataIndex: 'age',
    width: '10%'
  },
  {
    title: 'Amount',
    dataIndex: 'address',
    width: '10%',
  },
  {
    title: 'Amount Unit',
    dataIndex: 'address',
    width: '10%',
  },
  {
    title: 'Company',
    dataIndex: 'address',
    width: '40%',
  },
  {
    title: 'Edit',
    dataIndex: 'operation',
    render: () => (
    <Tooltip title="edit">
        <AddProductModal/>
    </Tooltip>)
  ,
  },
  {
    title: 'Delete',
    dataIndex: 'operation',
    render: () => <Tooltip title="Delete">
    <DeleteProductModal />
  </Tooltip>,

  }
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const onChange: TableProps<DataType>['onChange'] = ( extra) => {
  console.log('params', extra);
};

const ProductList: React.FC = () => {
return  (
  
        <div>
            <h1 className='table-title'>Products
              <br/>
              <Tooltip title="Add Product">
                    <Button className='add-button' shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </h1>
            
            <Table columns={columns} dataSource={data} onChange={onChange} pagination={false} />
        </div>)
};

export default ProductList;