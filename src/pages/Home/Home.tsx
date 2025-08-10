import styles from './Home.module.css'
import { Header, Footer, SideMenu, MyCarousel, ProductCollection, BusinessPartner } from '../../components'
import { Row, Col, Typography, Spin } from 'antd'
// import { productList1, productList2, productList3 } from './mockups';
import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import { MainLayout } from '../../layouts/mainLayout/MainLayout'

interface state {
  id: string,
  title: string,
  touristRoutes: any[]
}



export function Home() {
  const [productList, setProductList] = useState<state[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { t } = useTranslation()
  useEffect(() => {
    try {
      const loadData = async () => {
        setLoading(true)
        const { data } = await axios.get('/api/productCollections', {
          headers: {
            "x-icode": "6BF9A2FA3FA9CFA9"
          }
        })
        // console.log(data)
        setProductList(data)
        setLoading(false)
        setError(null)
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
    return <Spin
      size='large'
      style={{
        marginTop: 200,
        marginBottom: 200,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '100%'
      }}  ></Spin>
  }
  if (error) {
    return <div>网站出错:{error}</div>
  }
  return (
    <MainLayout>
      <Row style={{ marginTop: 20 }}>
        <Col span={6}><SideMenu /></Col>
        <Col span={18}><MyCarousel /></Col>
      </Row>

      <ProductCollection
        title={<Typography.Title level={3} type='warning'>{t("home_page.hot_recommended")}</Typography.Title>}
        sideImage={sideImage}
        products={productList[0].touristRoutes}
      />
      <ProductCollection
        title={<Typography.Title level={3} type='danger'>{t("home_page.new_arrival")}</Typography.Title>}
        sideImage={sideImage2}
        products={productList[1].touristRoutes}
      />
      <ProductCollection
        title={<Typography.Title level={3} type='success'>{t("home_page.domestic_travel")}</Typography.Title>}
        sideImage={sideImage3}
        products={productList[2].touristRoutes}
      />
      <BusinessPartner />
    </MainLayout>
  )
}
