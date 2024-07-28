'use client'
import { AppDispatch } from "@/redux/store"
import { validateForgotPassword } from "@/utils/validateForms/validationForgotPassword"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { FourColumsContainer } from "../fourColumsContainer"
import { FormContainer } from "../formContainer"
import { sendPasswordReset } from "@/utils/firebase/auth"


export const ForgotPasswordForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        console.log(value)
        const errors = validateForgotPassword(email)
        if(errors) {
            setError(errors)
        } else {
            setError('')
        }
        setEmail(value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!error) {
            sendPasswordReset(email)
            setTimeout(() => {
                router.push("/login")
            }, 1500);
        } else {
            toast.error('Incorrect email', {
                position: 'top-right',
                duration: 1500,
              })
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heading2 text-white mb-16">Password recovery</h1>
            <FourColumsContainer imagen="forgotPassword.png" URLimagen="/forgotPassword.png">
                <FormContainer section="Enter your email">
                    <div className="flex flex-col gap-2 w-fit">
                        <label className="body text-white">Email</label>
                        <input type="text"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="input"
                            required 
                            />
                            {error ? (<p className="errorForm">{error}</p>) : (<p className="errorForm"><br/></p>)}
                    </div>

                    <div className="mt-4 flex flex-row gap-2">
                            <button type="submit" className="buttonPrimary">Recover password</button>
                    </div>
                </ FormContainer>
            </FourColumsContainer>
        </form>
    )
}