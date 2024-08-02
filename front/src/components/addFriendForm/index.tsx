'use client'
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
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
        }}

        const handlesubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            console.log(friend)
        }



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

