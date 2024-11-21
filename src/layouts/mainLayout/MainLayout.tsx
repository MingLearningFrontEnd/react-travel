import styles from './mainLayout.module.css'
import { Header,Footer } from '../../components'
interface PropType{
    children:React.ReactNode
}


export function MainLayout ({children}:PropType){

    return(
        <>
             <Header />
             <div className={styles['page-content']}>
                {children}
             </div>
             <Footer />
        </>
    )
}