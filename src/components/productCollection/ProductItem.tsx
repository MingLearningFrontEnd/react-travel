import { Image, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
interface PropsType {
    id: string | number,
    size: 'large' | 'small',
    title: string,
    imageSrc: string,
    price: string | number

}
export function ProductItem({ id, title, size, imageSrc, price }: PropsType) {
  const navigate = useNavigate()
  const {t} = useTranslation()
    return (
        <div onClick={()=>navigate(`detail/${id}`)}>
            {size === 'large' ? (
                <Image src={imageSrc} height={285} width={490} />
                )
                : (
                    <Image src={imageSrc} height={120} width={240} />
                )
            }
            <div>
                <Typography.Text type='secondary'>
                    {title.slice(0, 25)}
                </Typography.Text>
                <Typography.Text type='danger' strong>
                    ¥{price}{t(`home_page.start_from`)}
                </Typography.Text>
            </div>
        </div>

    )
}