'use client'
import { IGamePost, IGamePostError } from "@/interfaces/interfaceTournaments";
import { AppDispatch, RootState } from "@/redux/store";
import { validateGame } from "@/utils/validateForms/validationGame";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export const DashboardViewGameForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData ] = useState<IGamePost>({} as IGamePost);
    const [errorGame, setErrorGame] = useState<IGamePostError>({} as IGamePostError);

    const userId = useSelector((state: RootState) => state.user.user?.id);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        const error = validateGame(data)
        if (error.name) {
            setErrorGame(error)
        } else {
            setErrorGame({} as IGamePostError)
        }
        setData({
            ...data,
            [name]: value
        })
    }
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // dispatch(createGameSlice(data))
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2">
            <div>
                <h1 className="heading5 text-lightViolet mb-2">Create game</h1>
                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={handleChange}
                        className="input"
                    />
                    {errorGame.name ? <p className="errorForm">{errorGame.name}</p> : <p className="errorForm"><br/></p>}
                </div>

                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Image</label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        value={data.urlImage as string}
                        onChange={handleChange}
                        className="input"
                    />
                    <br/>
                </div>

                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Description</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={data.description}
                        onChange={handleChange}
                        className="input"
                    />
                    {errorGame.description ? <p className="errorForm">{errorGame.description}</p> : <p className="errorForm"><br/></p>}
                </div>

                <button className="buttonPrimary" type="submit">Create</button>
            </div>
            <div className="w-full h-64 flex items-center border-lightViolet border-4 rounded-2xl overflow-hidden">
                <Image 
                src={data.urlImage ? data.urlImage as string : 'https://res.cloudinary.com/dofwlsemg/image/upload/v1723001828/niyic87vymj5vqitz7my.jpg'} 
                width={500} 
                height={500}
                alt={data.name} 
                className="w-full h-full object-cover"/>
            </div>
        </form>
    )
}