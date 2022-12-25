import React from 'react';
import { Button, Card, Col, Row, Tooltip, Watermark } from 'antd';
import { ArrowRightOutlined} from '@ant-design/icons';

const { Meta } = Card;


const Report: React.FC = () => (
    <Watermark content="Process Management">
    <div className="site-card-wrapper">
                    <h1 className='table-title'>Report</h1>

      <Row gutter={12}>
        <Col span={6}>
        <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
        </Col>
        <Col span={6}>
        <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
        </Col>
        <Col span={6}>
        <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
        </Col>
        <Tooltip className='deneme' title="More">
        <Button className='report-button deneme' shape="circle" icon={<ArrowRightOutlined />} />
      </Tooltip>
      </Row>
      
    </div>
    </Watermark>

  );
  
export default Report;