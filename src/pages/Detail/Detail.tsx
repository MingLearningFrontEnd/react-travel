import { useParams } from 'react-router-dom'
import styles from './Detail.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Spin, Row, Col, DatePicker, Divider, Typography } from 'antd'
import { Header, Footer, ProductIntro } from '../../components'

type MatchParams = {
    touristRouteId: string
}
export function Detail() {
    const { touristRouteId } = useParams<MatchParams>()
    const [loading, setLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const { RangePicker } = DatePicker;
    useEffect(() => {
        try {
            const loadData = async () => {
                setLoading(true)
                const { data } = await axios.get(`http://82.157.43.234:8080/api/touristRoutes/${touristRouteId}`)
                setProducts(data)
                setLoading(false)
            }
            loadData()
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
                setLoading(false)
            }
        }

    }, [])

    if (loading) {
        return (
            <Spin
                size='large'
                style={{
                    marginTop: 200,
                    marginBottom: 200,
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    width: '100%'
                }}
            ></Spin>
        )
    }
    if (error) {
        return <div>网站出错:{error}</div>
    }
    return (
        <>
            <Header />
            <div className={styles['page-content']}>
                
                {/* 产品简介，日期选择 */}
                <div className={styles['product-intro-container']}>
                    <Row>
                        <Col span={13}>
                            <ProductIntro
                                title={products.title}
                                shortDescription={products.description}
                                price={products.originalPrice}
                                coupons={products.coupons}
                                points={products.points}
                                discount={products.price}
                                rating={products.rating}
                                picture={products.touristRoutePictures.map((p: any) => p.url)}

                            />
                        </Col>
                        <Col span={11}>
                            <RangePicker open style={{ marginTop: 20 }} />
                        </Col>
                    </Row>
                </div>

                {/* 锚点菜单 */}
                <div className={styles['product-detail-anchor ']}></div>

                {/* 产品特色 */}
                <div id='feature' className={styles['product-detail-container']}>
                    <Divider orientation='center'>
                        <Typography.Title level={3}>
                            产品特色
                        </Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: products.features }} style={{ margin: 50 }}></div>
                </div>

                {/* 产品费用 */}
                <div id='fees' className={styles['product-detail-container']}>
                    <Divider orientation='center'>
                        <Typography.Title level={3}>产品费用</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: products.fees }} style={{ margin: 50 }}></div>
                </div>

                {/* 预订须知 */}
                <div id='notes' className={styles['product-detail-container']}>
                    <Divider orientation='center'>
                        <Typography.Title level={3}>预订须知</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: products.notes }} style={{ margin: 50 }}></div>
                </div>

                {/* 产品评价 */}
                <div id='comments' className={styles['product-detail-container']}>

                </div>

            </div>

            <Footer />
        </>
    )

}