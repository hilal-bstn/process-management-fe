import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Empty, Row, Tag, Timeline, Tooltip, Watermark } from 'antd';
import { ArrowRightOutlined} from '@ant-design/icons';
import productImageSrc from '../../images/product.jpg';
import companyImageSrc from '../../images/company.jpg';
import userImageSrc from '../../images/user.jpg';
import ProductService from '../../services/productService';
import CompanyService from '../../services/companyService';
import {
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const Report: React.FC = ()=>{

  const [products,setProducts]=React.useState([] as any[])
  const [companies,setCompanies]=React.useState([] as any[]);
  const navigate=useNavigate();
  const moreButton=()=>{
    navigate('/products');
}
  useEffect(() => {
      getProducts();
      getCompanies();
  },[]);

  const getProducts = async () => {
    let productService = new ProductService();
    let productResult = await productService.newProducts();
    setProducts(productResult);    
  }

  const getCompanies = async () => {
    let companyService = new CompanyService();
    let companyResult = await companyService.newCompanies();
    setCompanies(companyResult);
  }

  return(
    <Watermark content="Process Management">
    
      <div className="site-card-wrapper">
                      <h1 className='table-title'>Report</h1>

          <Row gutter={12}>

            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img  
                  src={productImageSrc}
                  alt="logo"
                  className='process-image report-image'>
                        </img>}>    
                        <h1 className='table-title'>New Products</h1> 
                        <Timeline>  
        
                            {
                            products.length>0  
                            ? products.map((item,index)=> (<Timeline.Item  key = {item._id}>{item.name} - {item.category} - {item.amount}</Timeline.Item>))
                            : <Empty />
                            } 
                        </Timeline>

              </Card>
            </Col>

            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img  
                  src={companyImageSrc}
                  alt="logo"
                  className='process-image report-image'>
              </img>}
              >
                  <h1 className='table-title'>New Companies</h1>   
                  <Timeline> 
                        {
                        companies.length>0  
                        ? companies.map((item,index)=> (<Timeline.Item  key = {item._id}>{item.companyName} - {item.incorporationCountry} - {item.website}</Timeline.Item>))
                        : <Empty />
                        } 
                  </Timeline>
              </Card>
            </Col>

            <Col span={6}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<img  
                  src={userImageSrc}
                  alt="logo"
                  className='process-image report-image'>
              </img>}
              >
                  <h1 className='table-title'>Process Management</h1> 
                  <Tag icon={<TwitterOutlined />} color="#55acee">
                        Twitter
                      </Tag>
                      <Tag icon={<YoutubeOutlined />} color="#cd201f">
                        Youtube
                      </Tag>
                      <Tag icon={<LinkedinOutlined />} color="#55acee">
                        LinkedIn
                      </Tag>    
              </Card>
            </Col>

            <Tooltip title="More">
              <Button onClick={moreButton} className='report-button' shape="circle" icon={<ArrowRightOutlined />} />
            </Tooltip>
          </Row>     
       </div>
    </Watermark>

  );
};
  
export default Report;