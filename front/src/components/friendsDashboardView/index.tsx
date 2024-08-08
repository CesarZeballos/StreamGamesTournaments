<<<<<<< HEAD
'use client'
import { IUser } from "@/interfaces/interfaceUser";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
=======
import { IUser } from "@/interfaces/interfaceUser";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
>>>>>>> origin/cesar

//icons
import ChatIcon from '@mui/icons-material/Chat';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
<<<<<<< HEAD
import { setView } from "@/redux/slices/dashboardSlice";

export const FriendsDashboardView = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const friends = user?.friends || [] as IUser[];
=======

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

export const FriendsDashboardView = () => {
    const userR = useSelector((state: RootState) => state.user.user);
>>>>>>> origin/cesar

    const deleteFriend = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {value} = event.currentTarget
        console.log(value)
    }

    const newChat = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {value} = event.currentTarget
        console.log(value)
    }

<<<<<<< HEAD
    const handleViewClick = (view: string) => {
        dispatch(setView(view))
    }

    return (
        <div>
            <h1 className="heading5 text-lightViolet">Your friends</h1>
            <table className="mt-1 w-full">
=======
    return (
        <div>
            <h1 className="heading4 text-white">Your friends</h1>
            <table className="mt-4 w-full">
>>>>>>> origin/cesar
                <thead className="tableHeader flex flex-row justify-around">
                    <th className="text-center">Nickname</th>
                    <th className="text-center">Chat</th>
                    <th className="text-center">Delete</th>
                </thead>
<<<<<<< HEAD
                {friends.length === 0 ? (
                    <div className="flex flex-col w-full items-center justify-center gap-6 mt-10">
                        <p className="body text-white">{"You don't have any friends"}</p>
                        <button className="buttonPrimary" onClick={() => handleViewClick("addFriend")}>Add friend</button>
                    </div>
                ) : 
                (<tbody className="tableBody flex flex-col gap-2">
                    {friends.map((user) => (
                        <tr key={user.id} className="flex flex-row justify-around">
                            <td>{user.nickname}</td>
=======
                <tbody className="tableBody flex flex-col gap-2">
                    {users.map((user) => (
                        <tr key={user.id} className="flex flex-row justify-around">
                            <td>{user.nickName}</td>
>>>>>>> origin/cesar
                            <td className="text-center">
                                <button className="iconButton" value={user.id} onClick={newChat}>
                                    <ChatIcon />
                                </button>
                            </td>
                            <td className="text-center">
                                <button className="iconButton" value={user.id} onClick={deleteFriend}>
                                    <PersonRemoveIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
<<<<<<< HEAD
                </tbody>)
            }
=======
                </tbody>
>>>>>>> origin/cesar
            </table>
        </div>
    )
}