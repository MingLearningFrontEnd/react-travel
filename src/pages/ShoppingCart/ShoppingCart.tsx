import styles from './shoppingCart.module.css'
import { MainLayout } from '../../layouts/mainLayout'
import { Row, Col, Affix } from 'antd'
import { ProductList, PaymentCard } from '../../components'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store/hooks'
import { clearShoppingCart,checkOut } from '../../store/shoppingCartSlice/shoppingCartSlice'
import {useNavigate } from 'react-router-dom'



export function ShoppingCart() {
    const { token } = useSelector((state: any) => state.userSlice)
    const { loading } = useSelector((state: any) => state.shoppingCartSlice)
    const { items } = useSelector((state: any) => state.shoppingCartSlice)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <MainLayout >
            <Row>
                {/* 购物车清单 */}
                <Col span={16}>
                    <div className={styles['product-list-container']}>
                        <ProductList
                            data={items.map((i: any) => i.touristRoute)}
                        />
                    </div>
                </Col>
                {/* 支付卡组件 */}
                <Col span={8}>
                    <Affix>
                        <div className={styles['payment-card-container']}>
                            <PaymentCard
                                loading={loading}
                                originalPrice={items
                                    .map((item: any) => item.originalPrice)
                                    .reduce((a: number, b: number) => a + b, 0)
                                }
                                price={items
                                    .map((item: any) => item.originalPrice * (item.discountPresent?item.discountPresent:1))
                                    .reduce((a: number, b: number) => a + b, 0)
                                }
                                onCheckout={ async ()=>{
                                    if(items.length <=0){
                                        return
                                    }
                                     await dispatch(checkOut(token))
                                    navigate('/placeOrder')
                                }}
                                onShoppingCartClear={()=>{
                                    dispatch(clearShoppingCart({token,itemIds:items.map((item:any)=>item.id)}))
                                }}
                            />
                        </div>
                    </Affix>

                </Col>
            </Row>
        </MainLayout>
    )
}