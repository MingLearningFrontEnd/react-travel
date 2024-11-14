import styles from './carousel.module.css'
import { Carousel,Image } from 'antd'
import carouselImg1 from '../../assets/images/carousel_1.jpg'
import carouselImg2 from '../../assets/images/carousel_2.jpg'
import carouselImg3 from '../../assets/images/carousel_3.jpg'

export function MyCarousel (){

    return(
        <Carousel autoplay className={styles.slider} >
            <Image src={carouselImg1}/>
            <Image src={carouselImg2}/>
            <Image src={carouselImg3}/>

        </Carousel>
    )
}