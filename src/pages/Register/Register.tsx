import './Register.module.css'
import { UserLayout } from '../../layouts/userLayout'
import { RegiserForm } from './RegisterForm'
export function Register() {
    return (
        <UserLayout>
            <RegiserForm/>
        </UserLayout>
    )
}