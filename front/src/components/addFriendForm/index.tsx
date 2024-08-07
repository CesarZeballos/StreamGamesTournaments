'use client'
<<<<<<< HEAD
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
=======
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
>>>>>>> origin/cesar

//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
<<<<<<< HEAD
import { IUser, IUserSelector } from "@/interfaces/interfaceUser";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { addfriendSlice, reloadUserSlice } from "@/redux/thunks/userSliceThunk";
import { toast } from "sonner";
import { setView } from "@/redux/slices/dashboardSlice";
import { getUsersSlice } from "@/redux/thunks/auxiliarSliceThunk";
import { useRouter } from "next/navigation";
import { setStatusFriend } from "@/redux/slices/userSlice";

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
        if (value) {
            setFriend(value.id)
=======
import { ITeamError, ITeamForm, ITeamMember, IUser, IUserSelector } from "@/interfaces/interfaceUser";
import { validateTeamName } from "@/utils/validateForms/validationAddTeam";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const users: IUser[] = [
    {
        id: "1",
        nickName: "cesar1",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },

    {
        id: "2",
        nickName: "cesar2",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },

    {
        id: "3",
        nickName: "cesar3",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    }, 

    {
        id: "4",
        nickName: "cesar4",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },

    {
        id: "5",
        nickName: "cesar5",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },

    {
        id: "6",
        nickName: "cesar6",
        email: "cesar",
        birthDate: "cesar",
        role: "user",
        teams: [],
        tournaments: [],
    },
]

export const AddFriend: React.FC = () => {
    const [userSelector, setUserSelector] = useState<IUserSelector[]>([]);
    const [friend, setFriend] = useState<IUser>({} as IUser);

    useEffect(() => {
        if(userSelector. length === 0) {
            for (let i = 0; i < users.length; i++) {
                userSelector.push({
                    id: users[i].id,
                    label: users[i].nickName,
                    email: users[i].email,
                    birthDate: users[i].birthDate,
                    role: users[i].role,
                    teams: users[i].teams,
                    tournaments: users[i].tournaments
                })
            }
        }
    }, [])

    const handleChange = (event: any, value: IUserSelector | null) => {
        if (value) {
            setFriend({
                id: value.id,
                nickName: value.label,
                email: value.email,
                birthDate: value.birthDate,
                role: value.role,
                teams: value.teams,
                tournaments: value.tournaments
            }
            )
>>>>>>> origin/cesar
        }}

        const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
<<<<<<< HEAD
            if(friend !== "") {
                dispatch(addfriendSlice({userId: userActive.user?.id!, friendId: friend, token: userActive.token!}))
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
            dispatch(reloadUserSlice({
                email: userActive.user?.email!,
                tokenFirebase: userActive.user?.tokenFirebase
            }))
            dispatch(setStatusFriend())
        }, 1500);
    }}, [addFriendStatus, dispatch])

    return (
        <form onSubmit={handlesubmit} className="flex flex-col gap-2">
            <h1 className="heading5 text-lightViolet">Find your friend</h1>
=======
            console.log(friend)
        }



    return (
        <form onSubmit={handlesubmit} className="flex flex-col gap-2">
            <h1 className="heading4 text-white">Find your friend</h1>
>>>>>>> origin/cesar
            
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

