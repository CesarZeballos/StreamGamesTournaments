'use client'
import { useEffect, useState } from "react"
import { FormContainer } from "../formContainer"
import { FourColumsContainer } from "../fourColumsContainer"
import { IRegisterError, IRegisterForm } from "@/interfaces/interfaceUser"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { validateRegister } from "@/utils/validateForms/validationRegister"
import { loginSlice, registerSlice } from "@/redux/thunks/userSliceThunk"
import { AppDispatch, RootState } from "@/redux/store"
import { toast } from "sonner"

export const RegisterForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const statusRegister = useSelector((state: RootState) => state.user.statusRegister);
    const router = useRouter();

    const [data, setData] = useState<IRegisterForm>({
        nickName: "",
        email: "",
        password: "",
        birthDate: ""
    })

    const [errorRegister, setErrorRegister] = useState<IRegisterError>({
        nickName: "",
        email: "",
        password: "",
        birthDate: ""
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
        const errors = validateRegister(data)
        
        if (errors.nickName || errors.email || errors.password || errors.birthDate) {
            setErrorRegister(errors)
        } else {
            setErrorRegister({
                nickName: "",
                email: "",
                password: "",
                birthDate: ""
            })
        }
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!errorRegister.nickName || !errorRegister.email || !errorRegister.password || !errorRegister.birthDate) {
            const registerData = {
                ...data,
                birthdate: new Date(data.birthDate).toISOString()}
            dispatch(registerSlice(registerData))
        }else {
            toast('error register', {
                position: 'top-right',
                duration: 1500,
              })
        }
    }
    useEffect(() => {
        if(statusRegister === "succeeded") {
            // dispatch(loginSlice({
            //     email: data.email,
            //     password: data.password}))
            router.push("/")
        }
        
    }, [handleSubmit])
    
    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heading2 text-white mb-16">Register</h1>
            <FourColumsContainer imagen="register" URLimagen={"/register.jpg"}>
                    <FormContainer section={"Enter your data"}>
                        <div className="flex flex-col gap-2 w-fit">
                            <label className="body text-white">Nickname</label>
                            <input type="text"
                                name="nickName"
                                value={data.nickName}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                            {errorRegister.nickName ? (<p className="errorForm">{errorRegister.nickName}</p>) : (<p className="errorForm"><br/></p>)}
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
                                name="birthDate"
                                value={data.birthDate}
                                onChange={handleChange}
                                className="input"
                                required
                            />
                            {errorRegister.birthDate ? (<p className="errorForm">{errorRegister.birthDate}</p>) : (<p className="errorForm"><br/></p>)}
                        </div>

                        <button type="submit" className="buttonPrimary mt-4">Register</button>
                    </FormContainer>
            </FourColumsContainer>
        </form>
    )
}