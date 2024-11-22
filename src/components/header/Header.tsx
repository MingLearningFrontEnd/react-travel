import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { languageChange, addLangugae } from '../../store/LanguageSlice/languageSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { jwtDecode, JwtPayload as DefaultJwtPayload } from 'jwt-decode'
import { useState, useEffect } from 'react';
import { logOut } from '../../store/userSlice/userSlice';

interface JwtPayload extends DefaultJwtPayload {
  username: string
}




export function Header() {
  const { languageList, language } = useSelector((state: any) => state.languageSlice)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { token } = useSelector((state: any) => state.userSlice)
  const [username, setUsername] = useState('')
  const { items } = useSelector((state: any) => state.shoppingCartSlice)
  const { loading } = useSelector((state: any) => state.shoppingCartSlice)



  useEffect(() => {
    if (token) {
      const tokens = jwtDecode<JwtPayload>(token)
      setUsername(tokens.username)
    }
  }, [token])



  const handelClick = (e: any) => {
    if (e.key === 'new') {
      dispatch(addLangugae([...languageList, { name: '新语言', code: 'new_lang' }]))
    } else {
      dispatch(languageChange(e.key))
    }

  }

  const handleSearch = (keyword: string) => {
    if (keyword) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  const onLogOut = () => {
    dispatch(logOut())
    navigate('/')
  }

  return (
    <div className={styles['app-header']}>
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t('header.slogan')}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15, display: 'inline' }}
            icon={<GlobalOutlined />}
            overlay={
              <Menu onClick={(e) => handelClick(e)}>
                {
                  [...languageList.map((item: any) => {
                    return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                  }), <Menu.Item key='new'>{t('header.add_new_language')}</Menu.Item>]
                }
              </Menu>
            }
          >
            {language === 'zh' ? '中文' : 'English'}
          </Dropdown.Button>
          {token ? <Button.Group className={styles['button-group']}>
            <span>{t('header.welcome')}
              <Typography.Text strong>{username}</Typography.Text>
            </span>
            <Button
              onClick={() => navigate('/shoppingCart')}
              loading={loading}
            >{
                t('header.shoppingCart')}({items.length})
            </Button>
            <Button onClick={() => onLogOut()}>{t("header.signOut")}</Button>
          </Button.Group>
            : <Button.Group className={styles['button-group']}>
              <Button onClick={() => navigate('/register')}>{t('header.register')}</Button>
              <Button onClick={() => navigate('/login')}>{t('header.signin')}</Button>
            </Button.Group>}
        </div>
      </div>
      {/* logo和标题 */}
      <span onClick={() => navigate('/')}>
        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>{t('header.title')}</Typography.Title>
          <Input.Search
            className={styles['search-input']}
            placeholder='请输入旅游目的地，主题，或关键字'
            onSearch={(keyword) => handleSearch(keyword)}
          />
        </Layout.Header>
      </span>

      {/* 菜单 */}
      <Menu mode={'horizontal'} className={styles['main-menu']}
        items={[
          { key: "1", label: t("header.home_page") },
          { key: "2", label: t("header.weekend") },
          { key: "3", label: t("header.group") },
          { key: "4", label: t("header.backpack") },
          { key: "5", label: t("header.private") },
          { key: "6", label: t("header.cruise") },
          { key: "7", label: t("header.hotel") },
          { key: "8", label: t("header.local") },
          { key: "9", label: t("header.theme") },
          { key: "10", label: t("header.custom") },
          { key: "11", label: t("header.study") },
          { key: "12", label: t("header.visa") },
          { key: "13", label: t("header.enterprise") },
          { key: "14", label: t("header.high_end") },
          { key: "15", label: t("header.outdoor") },
          { key: "16", label: t("header.insurance") },
        ]}
      >

      </Menu>
    </div>
  )
}

