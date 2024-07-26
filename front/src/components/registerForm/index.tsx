'use client'
import { useState } from "react"
import { FormContainer } from "../formContainer"
import { FourColumsContainer } from "../fourColumsContainer"
import { IRegisterError, IRegisterForm } from "@/interfaces/interfaceUser"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { validateRegister } from "@/utils/validateForms/validationRegister"
import { registerSlice } from "@/redux/thunks/userSliceThunk"
import { AppDispatch } from "@/redux/store"

export const RegisterForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const Router = useRouter();

    const [data, setData] = useState<IRegisterForm>({
        nickname: "",
        email: "",
        password: "",
        birthdate: ""
    })

    const [errorRegister, setErrorRegister] = useState<IRegisterError>({
        nickname: "",
        email: "",
        password: "",
        birthdate: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        const errors = validateRegister(data)
        
        if (errors.nickname || errors.email || errors.password || errors.birthdate) {
            setErrorRegister(errors)
        } else {
            setErrorRegister({
                nickname: "",
                email: "",
                password: "",
                birthdate: ""
            })
        }
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!errorRegister.nickname || !errorRegister.email || !errorRegister.password || !errorRegister.birthdate) {
            dispatch(registerSlice(data))
        }else {
            alert ("")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heading2 text-white mt-9 mb-16">Register</h1>
            <FourColumsContainer imagen="register" URLimagen={"/register.jpg"}>
                    <FormContainer section={"Enter your data"}>
                        <div className="flex flex-col gap-2 w-fit">
                            <label className="body text-white">Nickname</label>
                            <input type="text"
                                name="nickname"
                                value={data.nickname}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                            {errorRegister.nickname ? (<p className="errorForm">{errorRegister.nickname}</p>) : (<p className="errorForm"><br/></p>)}
                        </div>

                        <div className="flex flex-col gap-2 w-fit">
                            <label className="body text-white">Email</label>
                            <input type="text"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                            {errorRegister.email ? (<p className="errorForm">{errorRegister.email}</p>) : (<p className="errorForm"><br/></p>)}
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
                            {errorRegister.password ? (<p className="errorForm">{errorRegister.password}</p>) : (<p className="errorForm"><br/></p>)}
                        </div>

                        <div className="flex flex-col gap-2 w-fit">
                            <label className="body text-white">Birthdate</label>
                            <input type="date"
                                name="birthdate"
                                value={data.birthdate}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                            {errorRegister.birthdate ? (<p className="errorForm">{errorRegister.birthdate}</p>) : (<p className="errorForm"><br/></p>)}
                        </div>

                        <button type="submit" className="buttonPrimary mt-4">Register</button>
                    </FormContainer>
            </FourColumsContainer>
        </form>
    )
}