import styles from './Header.module.css';
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
export function Header() {
  const navigate = useNavigate()
  return (
    <div className={styles['app-header']}>
      {/* top-header */}
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>让旅游更幸福</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15, display: 'inline' }}
            icon={<GlobalOutlined />}
            overlay={
              <Menu
                items={
                  [
                    { key: '1', label: '中文' },
                    { key: '2', label: 'English' },
                  ]
                }
              />
            }
          >
            语言
          </Dropdown.Button>
          <Button.Group className={styles['button-group']}>
            <Button onClick={()=>navigate('register')}>注册</Button>
            <Button onClick={()=>navigate('login')}>登录</Button>
          </Button.Group>
        </div>
      </div>
      {/* logo和标题 */}
      <span onClick={()=>navigate('/')}>
      <Layout.Header className={styles['main-header']}>
        <img src={logo} alt="" className={styles['App-logo']} />
        <Typography.Title level={3} className={styles.title}>React 旅游网</Typography.Title>
        <Input.Search
          className={styles['search-input']}
          placeholder='请输入旅游目的地，主题，或关键字'
        />
      </Layout.Header>
      </span>
     
      {/* 菜单 */}
      <Menu mode={'horizontal'} className={styles['main-menu']}
        items={[
          { key: '1', label:'游首页' },
          { key: '2', label: '跟团游' },
          { key: '3', label: '周末游' },
          { key: '4', label: '自由行' },
          { key: '5', label: '私家团' },
          { key: '6', label: '邮轮' },
          { key: '7', label: '当地玩乐' },
          { key: '8', label: '主题游' },
          { key: '9', label: '游学' },
          { key: '10', label: '签证' },
          { key: '11', label: '企业游' },
          { key: '12', label: '景点+酒店' },
          { key: '13', label: '高端游' },
          { key: '14', label: '爱玩户外' },
          { key: '15', label: '保险' },
          { key: '16', label: '制定游' },
        ]}
      >
      </Menu>
    </div>
  )
}

