import styles from './sideMenu.module.css'
import { sideMenuList } from './mokeup'
import { Menu } from 'antd'
import { GifOutlined } from '@ant-design/icons'

export function SideMenu() {
    return (
        <Menu mode='vertical'
        className={styles['side-menu']}
            items={sideMenuList.map((item) => (
                {
                    key: item.title,
                    label: item.title,
                    icon: <GifOutlined />,
                    children: item.subMenu.map((subitem) => (
                        {
                            key: subitem.title,
                            label: subitem.title,
                            icon: <GifOutlined />,
                            children: subitem.subMenu.map((ssubitem) => (
                                {
                                    key: ssubitem,
                                    label: ssubitem,
                                    icon: <GifOutlined />,
                                }))
                        }
                    ))
                })
            )}
        >

        </Menu>
    )
}