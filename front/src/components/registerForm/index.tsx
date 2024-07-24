'use client'
import { useState } from "react"
import { FormContainer } from "../formContainer"
import { FourColumsContainer } from "../fourColumsContainer"
import { IRegisterForm } from "@/interfaces/interfaceRegister"

export const RegisterForm: React.FC = () => {
    const [data, setData] = useState<IRegisterForm>({
        name: "",
        nickname: "",
        email: "",
        password: "",
        country: "",
        birthdate: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setData({
            ...data,
            [name]: value
        })
    }

    return (
        <form>
            <h1 className="heading2 text-white mt-9 mb-16">Register</h1>
            <FourColumsContainer>
                <h2 className="heading4 text-white">Your data</h2>
                <div className="col-span-2">
                        <FormContainer>
                            <div className="flex flex-col gap-2 w-fit">
                                <label className="body text-white">Name</label>
                                <input type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="input"
                                required
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-fit">
                                <label className="body text-white">Nickname</label>
                                <input type="text"
                                name="nickname"
                                value={data.nickname}
                                onChange={handleChange}
                                className="input"
                                required
                                />
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

                            <div className="flex flex-col gap-2 w-fit">
                                <label className="body text-white">Country</label>
                                <input type="text"
                                name="country"
                                value={data.country}
                                onChange={handleChange}
                                className="input"
                                required
                                />
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
                            </div>

                            <button className="buttonPrimary mt-4" type="submit">Register</button>
                        </FormContainer>
                        </div>
                        <div className="w-64 h-64 border-lightViolet border-4 rounded-full overflow-hidden">
                            <img  className="w-full h-full object-cover" src="/register.jpg" alt="login" />
                        </div>
            </FourColumsContainer>
        </form>
    )
}