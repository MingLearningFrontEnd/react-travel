import { MainLayout } from "../../layouts/mainLayout"
import { PaymentForm, CheckOutCard } from "../../components"
import { Row, Col } from "antd"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../store/hooks"
import { getOrder } from "../../store/orderSlice/orderSlice"


export function PlaceOrder() {
  const { token } = useSelector((state: any) => state.userSlice)
  const { loading } = useSelector((state: any) => state.orderSlice)
  const {currentOrder} = useSelector((state: any) => state.orderSlice)
  const dispatch = useAppDispatch()


  return (
    <MainLayout>
      <Row>
        <Col span={12}>›
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={currentOrder}
            onCheckout={() => {
              dispatch(getOrder({ token, orderId: currentOrder.id }))
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  )
}