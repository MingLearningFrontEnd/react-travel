import './BusinessPartner.module.css'
import { Divider, Col, Row, Typography } from 'antd'
import company1 from '../../assets/images/facebook-807588_640.png'
import company2 from '../../assets/images/follow-826033_640.png'
import company3 from '../../assets/images/icon-720944_640.png'
import company4 from '../../assets/images/microsoft-80658_640.png'

const data = [
    {src:company1,title:'facebook'},
    {src:company2,title:'Ins'},
    {src:company3,title:'Youtube'},
    {src:company4,title:'Microsoft'}
]
export function BusinessPartner() {
    return (
        <div >
            <Divider orientation='left'>
                <Typography.Title level={3}>合作企业</Typography.Title>
            </Divider>
            <Row>
                {data.map((item,index)=>(
                    <Col span={6} key={index}>
                        <img
                            src={item.src}
                            alt={item.title}
                            style={{
                                width:'80%',
                                display:'block',
                                margin:'auto'
                            }}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}