'use client'
import { useState } from "react"
import { FourColumsContainer } from "../fourColumsContainer"
import { FormContainer } from "../formContainer"
import { ILoginError, ILoginForm } from "@/interfaces/interfaceLogin"
import { useDispatch } from "react-redux"
import { login } from "@/redux/slices/userSlice"
import { useRouter } from "next/navigation"
import { validateLogin } from "@/utils/validateForms/validationLogin"


export const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const Router = useRouter();

    const [data, setData] = useState<ILoginForm>({
        email: "",
        password: ""
    })

    const [errorLogin, setErrorLogin] = useState<ILoginError>({
        email: "",
        password: ""
    })

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
            dispatch(login(data))
            Router.push("/")
        } else {
            alert ("Email or password incorrect")
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heading2 text-white mt-9 mb-16">Login</h1>
            <FourColumsContainer>
                <h2 className="heading4 text-white">Enter your data</h2>
                <div className="col-span-2">
                    <FormContainer>
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
                        <button className="buttonPrimary mt-4">Login</button>
                    </FormContainer>
                </div>
                <div className="w-64 h-64 border-lightViolet border-4 rounded-full overflow-hidden">
                    <img  className="w-full h-full object-cover" src="/login.jpg" alt="login" />
                </div>
            </FourColumsContainer>

        </form>
    )}