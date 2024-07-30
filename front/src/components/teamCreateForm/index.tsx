'use client'
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { ITeamError, ITeamForm, ITeamMember, IUser } from "@/interfaces/interfaceUser";
import { validateTeamName } from "@/utils/validateForms/validationAddTeam";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export const TeamCreateForm = () => {
    const [teamName, setTeamName] = useState<string>("")
    const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([])

    const [error, setError] = useState<string>("")

    //configuracion del selector con input de autocompletado
    const [membersInput, setMembersInput] = useState([
        {
            id: 1,
            nickName: "juancarlo"
        }, 
        {
            id: 2,
            nickName: "juancarlo2"
        },
        {
            id: 3,
            nickName: "juancarlo3"
        }
    ])
    const [value, setValue] = useState<string | null>(null)
    const [inputValue, setInputValue] = useState('');

    const selectedValues = membersInput.map((option) => option.nickName)
    const handleChangeMember = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        // setTeamMembers({
        //     ...data,
        //     members: data.members.map((member) => {
        //         if(member.id === value) {
        //             return {
        //                 ...member,
        //                 nickName: name
        //             }
        //         } else {
        //             return member
        //         }
        //     })
        // })
    }

    const addMember = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        // setTeamMembers({
        //     ...data,
        //     members: [...data.members, {id: data.members.length + 1, nickName: ''}]
        // })
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setTeamName(value)
        const errors = validateTeamName(value);
        setError(errors)
    }

    const deleteMember = (index: number) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault()
        // setTeamMembers({
        //     ...data,
        //     members: data.members.filter((member, i) => i !== index)
        // })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!error) {
            console.log("data", teamName, teamMembers)
        }
    }

    return (
        <div>
            <h1 className="heading4 text-white">{`Let's create your team`}</h1>
            <form className="flex flex-col my-4 gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1">
                    <h2 className="body text-white">Team Name</h2>
                    <input type="text"
                    name="name"
                    value={teamName}
                    onChange={handleChange}
                    className="input w-fit"
                    required/>
                    {error ? (<p className="errorForm">{error}</p>) : (<p className="errorForm"><br/></p>)}
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="body text-white">Team members</h2>
                    
                    <div className="flex flex-col">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="flex flex-row items-center gap-2">
                                <p className="body">{member.nickName}</p>
                                <button className="buttonSecondary" onClick={deleteMember(index)}>
                                    <DeleteIcon />
                                </button>
                            </div>
                        ))}
                        {teamMembers.length >= 5 ? (
                            <p className="body text-white">Max 5 members</p>
                        ) : (
                            <div className="flex flex-row gap-2">
                                <Autocomplete
                                    className="input w-fit"
                                    value={value}
                                    onChange={(event: any, newValue: string | null) => {
                                        setValue(newValue);
                                        console.log(newValue)
                                      }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                    }}
                                    id="users"
                                    options={selectedValues}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="select user" />}
                                />

                                <button className="buttonSecondary flex flex-row gap-4" onClick={addMember}>
                                    <AddCircleIcon />Add member
                                </button>
                            </div> 
                        )}
                    </div>
                </div>
                <button type="submit" className="buttonPrimary">Create</button>
            </form>
            
        </div>
    )
}

