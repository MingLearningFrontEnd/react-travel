import { useParams } from 'react-router-dom'
import './Detail.module.css'


type MatchParams = {
    touristRouteId:string
}
export function Detail (){
const params = useParams<MatchParams>()
    return(
        <div>
            我是detail,路线id:{params.touristRouteId}
        </div>
    )

}