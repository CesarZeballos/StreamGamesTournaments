'use client'
import { useEffect, useState } from "react"
import { FourColumsContainer } from "../fourColumsContainer"
import { FormContainer } from "../formContainer"
import { IChangesData, IChangesErrors } from "@/interfaces/interfaceUser"
import { useDispatch, useSelector } from "react-redux"
import { validateChanges } from "@/utils/validateForms/validateChanges"
import { updateUserSlice } from "@/redux/thunks/userSliceThunk"
import { AppDispatch, RootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export const ChangesForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const userId = useSelector((state: RootState) => state.user.user?.id);

    const [data, setData] = useState<IChangesData>({
        birthdate: "",
        nickname: ""
    });

    const [errorChanges, setErrorsChange] = useState<IChangesErrors>({
        birthdate: "",
        nickname: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const errors = validateChanges({ ...data, [name]: value });

        setErrorsChange(errors);
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Verificar si userId está definido y no hay errores antes de despachar
        if (userId && !errorChanges.birthdate && !errorChanges.nickname) {
            dispatch(updateUserSlice({ id: userId, ...data }));
        } else {
            toast.error('There are errors in the form or user ID is missing', {
                position: 'top-right',
                duration: 1500,
            });
        }
    };

    // Ruteo automático después del éxito en la actualización
    const changesStatus = useSelector((state: RootState) => state.user.status);
    useEffect(() => {
        if (changesStatus === "succeeded") {
            setTimeout(() => {
                router.push("/");
            }, 2000);
        }
    }, [changesStatus, router]);

    return (
        <form onSubmit={handleSubmit} className="mt-9">
            <FourColumsContainer imagen="login" URLimagen={"/login.jpg"}>
                <FormContainer section={"Change Data"}>
                    <div className="flex flex-col gap-2 w-fit">
                        <label className="body text-white">Birthdate</label>
                        <input type="text"
                            name="birthdate"
                            value={data.birthdate}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                        {errorChanges.birthdate ? (<p className="errorForm">{errorChanges.birthdate}</p>) : (<p className="errorForm"><br /></p>)}
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
                        {errorChanges.nickname ? (<p className="errorForm">{errorChanges.nickname}</p>) : (<p className="errorForm"><br /></p>)}
                    </div>

                    <div className="mt-4 flex flex-row gap-2">
                        <button type="submit" className="buttonPrimary">Change Data</button>
                    </div>
                </FormContainer>
            </FourColumsContainer>
        </form>
    );
};