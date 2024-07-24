'use client'
import { useState } from "react"
import { FourColumsContainer } from "../fourColumsContainer"
import { FormContainer } from "../formContainer"
import { ILoginForm } from "@/interfaces/interfaceLogin"
import { useDispatch } from "react-redux"
import { login } from "@/redux/slices/loginSlice"
import { useRouter } from "next/navigation"


export const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const Router = useRouter();
    const [data, setData] = useState<ILoginForm>({
        email: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(login(data))
        Router.push("/")
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heanding2 text-white mt-9 mb-16">Login</h1>
            <FourColumsContainer>
                <h2 className="heanding4 text-white">Enter your data</h2>
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
                        </div>
                        <button className="buttonPrimary mt-7">Login</button>
                    </FormContainer>
                </div>
                <div className="w-64 h-64 border-lightViolet border-4 rounded-full overflow-hidden">
                    <img  className="w-full h-full object-cover" src="/login.jpg" alt="login" />
                </div>
            </FourColumsContainer>

        </form>
    )}