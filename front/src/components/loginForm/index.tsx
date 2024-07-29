'use client'
import { useEffect, useState } from "react"
import { FourColumsContainer } from "../fourColumsContainer"
import { FormContainer } from "../formContainer"
import { ILoginError, ILoginForm } from "@/interfaces/interfaceUser"
import { useDispatch, useSelector } from "react-redux"
import { validateLogin } from "@/utils/validateForms/validationLogin"
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link"
import { loginSlice } from "@/redux/thunks/userSliceThunk"
import { AppDispatch, RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [data, setData] = useState<ILoginForm>({
        email: "",
        password: ""
    })

    const [errorLogin, setErrorLogin] = useState<ILoginError>({
        email: "",
        password: ""
    })

    //control de ingreso a la page
    const user = useSelector((state: RootState) => state.user.user);
    useEffect(() => {
        if (user) {
            router.push("/")
        }
    }, [router, user])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        const errors = validateLogin(data)
        
        if (errors.email || errors.password) {
            setErrorLogin(errors)
        } else {
            setErrorLogin({
                email: "",
                password: ""
            })
        }
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!errorLogin.email || !errorLogin.password) {
            dispatch(loginSlice(data))
            setTimeout(() => {
                if(user) {
                    router.push("/")
                } else return
            }, 1500);
        } else {
            toast.error('Email or password incorrect', {
                position: 'top-right',
                duration: 1500,
              })
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heading2 text-white mb-16">Login</h1>
            <FourColumsContainer imagen="login" URLimagen={"/login.jpg"}>
                    <FormContainer section={"Enter your data"}>
                        <div className="flex flex-col gap-2 w-fit">
                            <label className="body text-white">Email</label>
                            <input type="text"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                            {errorLogin.email ? (<p className="errorForm">{errorLogin.email}</p>) : (<p className="errorForm"><br/></p>)}
                        </div>

                        <div className="flex flex-col gap-2 w-fit">
                            <label className="body text-white">Password</label>
                            <input type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                            {errorLogin.password ? (<p className="errorForm">{errorLogin.password}</p>) : (<p className="errorForm"><br/></p>)}
                        </div>

                        <div className="mt-4 flex flex-row gap-2">
                            <button type="submit" className="buttonPrimary">Login</button>
                            {/* <button className="buttonSecondary"><GoogleIcon /></button> */}
                        </div>
                        
                        <Link href="/forgotPassword" className="linkButton">Forgot your password?</Link>
                    
                    </FormContainer>
            </FourColumsContainer>

        </form>
    )}