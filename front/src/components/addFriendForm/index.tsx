'use client'
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IUser, IUserSelector } from "@/interfaces/interfaceUser";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { addfriendSlice } from "@/redux/thunks/userSliceThunk";
import { toast } from "sonner";
import { setView } from "@/redux/slices/dashboardSlice";
import { getUsersSlice } from "@/redux/thunks/auxiliarSliceThunk";
import { useRouter } from "next/navigation";

export const AddFriend: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [userSelector, setUserSelector] = useState<IUserSelector[]>([]);
    const [friend, setFriend] = useState<string>("");

    const userActive = useSelector((state: RootState) => state.user);
    const users = useSelector((state: RootState) => state.auxiliar.users);

    useEffect(() => {
        dispatch(getUsersSlice())
    }, [dispatch])
    
    useEffect(() => {
            if(userSelector.length === 0) {
                for (let i = 0; i < users.length; i++) {
                    if(users[i].id !== userActive.user?.id){
                        userSelector.push({
                            id: users[i].id,
                            label: users[i].nickname,
                            email: users[i].email,
                            birthdate: users[i].birthdate,
                            role: users[i].role
                        })
                    }
                }
            }
    }, [users, userSelector, dispatch, userActive.user?.id])

    const handleChange = (event: any, value: IUserSelector | null) => {
        console.log(value)
        if (value) {
            setFriend(value.id)
        }}

        const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if(friend !== "") {
                dispatch(addfriendSlice({userId: userActive.user?.id!, friendId: friend, token: userActive.token!}))
                router.push("/dashboard")
        } else {
            toast.error('Select a friend', {
                position: 'top-right',
                duration: 1500,
            })
        }
    }

    const addFriendStatus = useSelector((state: RootState) => state.user.statusAddFriend)
    useEffect(() => {
        if (addFriendStatus === "succeeded") {
        setTimeout(() => {
            dispatch(setView("friends"))
        }, 2000);
    }}, [addFriendStatus, dispatch])



    return (
        <form onSubmit={handlesubmit} className="flex flex-col gap-2">
            <h1 className="heading4 text-white">Find your friend</h1>
            
            <p className="body text-white mt-4">Search by nickname</p>
            <Autocomplete
            className="inputMUI"
            disablePortal
            id="SelectFriends"
            options={userSelector}
            onChange={handleChange}
            sx={{ width: 320 }}
            renderInput={(params) => <TextField {...params} />}
            />
            
            <button type="submit" className="buttonPrimary mt-4">Add as a friend</button>
        </form>
    )
}

