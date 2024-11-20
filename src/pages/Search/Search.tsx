import styles from './seacrh.module.css'
import { Header, Footer, ProductList,FilterArea } from '../../components'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Spin } from 'antd'
import { getSearch } from '../../store/SearchSlice/searchSlice'
import { useAppDispatch } from '../../store/hooks'
import { useSelector } from 'react-redux'

type MatchParams = {
    keywords:string
}
export function Search() {
    const {keywords} = useParams<MatchParams>()
    const {loading} = useSelector((state: any) => state.searchSlice)
    const productList = useSelector((state: any) => state.searchSlice.data)
    const {pagination} = useSelector((state: any) => state.searchSlice)
    const {error} = useSelector((state: any) => state.searchSlice)
    const dispatch = useAppDispatch()
    const location = useLocation

    useEffect(() => {
        if(keywords){
            dispatch(getSearch({nextPage:1,pageSize:10,keywords}))
        }else{
            dispatch(getSearch({nextPage:1,pageSize:10,keywords:''}))

        }
    }, [location])

    const onPageChange=(nextPage:any,pageSize:any)=>{
        if(keywords){
            dispatch(getSearch({nextPage,pageSize,keywords}))
        }else{
            dispatch(getSearch({nextPage,pageSize,keywords:''}))

        }
    }
    if (loading) {
        return <Spin
        size='large'
        style={{
            marginTop:200,
            marginBottom:200,
            marginRight:'auto',
            marginLeft:'auto',
            width:'100%',
            height:375
            
        }}  ></Spin>
      }
      if(error){
        return<div>网站出错:{error}</div>
    }
    return (
        <>
            <Header />
            <div className={styles['page-content']}>
                {/* 分过滤器 */}
                <div className={styles['product-list-container']}>
                    <FilterArea />
                </div>
                {/* 产品列表 */}
                <div className={styles['product-list-container']}>
                    <ProductList 
                    data={productList}
                    paging = {pagination}
                    onPageChange={onPageChange}
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}