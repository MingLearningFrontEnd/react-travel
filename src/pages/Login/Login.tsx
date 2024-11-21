import './Login.module.css'
import { UserLayout } from '../../layouts/userLayout'
import { LoginFrom } from './LoginForm'

export function Login() {

    return (
        <UserLayout>
            <LoginFrom />
        </UserLayout>

    )
}