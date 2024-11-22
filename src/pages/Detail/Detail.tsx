import { useNavigate, useParams } from 'react-router-dom'
import styles from './Detail.module.css'
// import axios from 'axios'
import { useEffect } from 'react'
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, Button, message} from 'antd'
import { ProductIntro } from '../../components'
// import { fetchStart,fetchFail,fetchSuccess } from '../../store/detailSlice/detailSlice'
import { useSelector } from 'react-redux'
import { getProductDetail } from '../../store/detailSlice/detailSlice'
import { useAppDispatch } from '../../store/hooks'
import { MainLayout } from '../../layouts/mainLayout'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { addShoppingCart } from '../../store/shoppingCartSlice/shoppingCartSlice'




type MatchParams = {
    touristRouteId: string
}



export function Detail() {
    const { touristRouteId } = useParams<MatchParams>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    // const [loading, setLoading] = useState<boolean>(true)
    // const [products, setProducts] = useState<any>(null)
    // const [error, setError] = useState<string | null>(null)
    const { loading } = useSelector((state: any) => state.detailSlice)
    const { error } = useSelector((state: any) => state.detailSlice)
    const { products } = useSelector((state: any) => state.detailSlice)
    const { token } = useSelector((state: any) => state.userSlice) 
    const shoppingloading = useSelector((state: any) => state.shoppingCartSlice.loading)
    const { RangePicker } = DatePicker;



    useEffect(() => {
        if (touristRouteId) {
            dispatch(getProductDetail(touristRouteId))
        }
    }, [])

    const handleAdd = async()=>{
        if(!token){
         navigate('/login')
        }
       await dispatch(addShoppingCart({token, touristRouteId:products.id}))
       message.success('加入成功')
       
    }
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
        <MainLayout>
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
                        <Button
                            size='large' 
                            type='primary'
                            loading = {shoppingloading}
                            style={{
                                marginTop: 50,
                                marginBottom: 30,
                                display: 'block'
                            }}
                            onClick={()=>handleAdd()}
                        >
                            <ShoppingCartOutlined />
                            加入购物车
                        </Button>
                        <RangePicker open style={{ marginTop: 20 }} />
                    </Col>
                </Row>
            </div>

            {/* 锚点菜单 */}
            <Anchor className={styles['product-detail-anchor']}>
                <Menu mode='horizontal'>
                    <Menu.Item key='1'>
                        <Anchor.Link href='#feature' title='产品特色'></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <Anchor.Link href='#fees' title='产品费用'></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <Anchor.Link href='#notes' title='预订须知'></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <Anchor.Link href='#comments' title='用户评价'></Anchor.Link>
                    </Menu.Item>
                </Menu>
            </Anchor>

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
        </MainLayout>
    )

}