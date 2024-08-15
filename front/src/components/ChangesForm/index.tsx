'use client'
import { useState } from "react";
import { IChangesData, IChangesErrors } from "@/interfaces/interfaceUser";
import { useDispatch, useSelector } from "react-redux";
import { validateChanges } from "@/utils/validateForms/validateChanges";
import { reloadUserSlice, updateUserSlice } from "@/redux/thunks/userSliceThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { toast } from "sonner";

export const ChangesForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
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
        const newData = { ...data, [name]: value };
        const errors = validateChanges(newData);

        setErrorsChange(errors);
        setData(newData);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userId) {
            const updatedData: Partial<IChangesData> = {};
            if (data.birthdate) updatedData.birthdate = new Date(data.birthdate).toISOString().split('T')[0];
            if (data.nickname) updatedData.nickname = data.nickname;
            if (Object.keys(updatedData).length > 0) {
                dispatch(updateUserSlice({ id: userId, ...updatedData })).then((result) => {
                    if (updateUserSlice.fulfilled.match(result)) {
                        setData({
                            birthdate: "",
                            nickname: ""
                        });
                    }
                    dispatch(reloadUserSlice({
                        email: user?.email!,
                        tokenFirebase: user?.tokenFirebase
                    }));
                });
            } else {
                toast.error('No data to update', {
                    position: 'top-right',
                    duration: 1500,
                });
            }
        } else {
            toast.error('User ID is missing', {
                position: 'top-right',
                duration: 1500,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2">
                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Birthdate</label>
                    <input 
                        type="date"
                        name="birthdate"
                        value={data.birthdate}
                        onChange={handleChange}
                        className="input"
                    />
                    {errorChanges.birthdate && <p className="errorForm">{errorChanges.birthdate}</p>}
                </div>

                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Nickname</label>
                    <input 
                        type="text"
                        name="nickname"
                        value={data.nickname}
                        onChange={handleChange}
                        className="input"
                    />
                    {errorChanges.nickname && <p className="errorForm">{errorChanges.nickname}</p>}
                </div>
            </div>
            <div className="mt-10 mb-4 flex justify-center">
                <button type="submit" className="buttonPrimary">Change Data</button>
            </div>
        </form>
    );
};