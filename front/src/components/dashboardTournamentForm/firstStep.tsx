import { IFirstStep } from "@/interfaces/interfaceRedux"
import { IFirstStepError } from "@/interfaces/interfaceTournaments"
import { setFirstStep } from "@/redux/slices/organizerSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { getGamesActivesSlice } from "@/redux/thunks/auxiliarSliceThunk"
import { validateTournamentFirstStep } from "@/utils/validateForms/validationTournamentPost"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const categories = ["Beginner", "Advanced", "Expert"]

export const FirstStep: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<IFirstStep>({} as IFirstStep)
    const [errorTournament, setErrorTournament] = useState<IFirstStepError>({} as IFirstStepError);
    const games = useSelector((state: RootState) => state.tournament.games);
    
    //seteo de la informacion
    useEffect(() => {
        //aca deberia taer la data del form completo en redux y setearla en data...
        if (games.length === 0) {
        dispatch(getGamesActivesSlice())
        }
    }, [dispatch, games])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        const error = validateTournamentFirstStep(data)
        if (error.nameTournament || error.startDate || error.category) {
          setErrorTournament(error)
        } else {
          setErrorTournament({} as IFirstStepError)
        }
        setData(
        {
            ...data,
            [name]: value
        }
        )
    }

    const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        const error = validateTournamentFirstStep(data)
        if (error.nameTournament || error.startDate || error.category) {
          setErrorTournament(error)
        } else {
          setErrorTournament({} as IFirstStepError)
        }
        setData(
        {
            ...data,
            category: value
        }
        )
    }

    const handleChangeGame = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target
        const image = games.find(game => game.id === value)?.urlImage
        if (image) {
            setData(
            {
                ...data,
                gameId: value,
                urlAvatar: image
            })}
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(setFirstStep(data))
    }

    return (
        <form onSubmit={handleSubmit} className="col-span-2">
            <div className="flex flex-col gap-2 w-fit">
                <label className="body text-white">Tournament name</label>
                <input
                    type="text"
                    name="nameTournament"
                    value={data.nameTournament}
                    onChange={handleChange}
                    required
                    className="input"
                />
                {errorTournament.nameTournament ? (<p className="errorForm">{errorTournament.nameTournament}</p>) : (<p className="errorForm"><br/></p>)}
            </div>

            <div className="grid grid-cols-3">
                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Category</label>
                    <select
                    value={data.category}
                    onChange={handleChangeCategory}
                    required
                    className="inputFit"
                    >
                    <option value="">Select a category</option>
                    {categories.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                    </select>
                    {errorTournament.category ? (<p className="errorForm">{errorTournament.category}</p>) : (<p className="errorForm"><br/></p>)}
                </div>

                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Game</label>
                    <select
                    value={data.gameId}
                    onChange={handleChangeGame}
                    required
                    className="inputFit"
                    >
                    <option value="">Select a game</option>
                    {games.map((option) => (
                        <option key={option.id} value={option.id}>
                        {option.name}
                        </option>
                    ))}
                    </select>
                    {errorTournament.gameId ? (<p className="errorForm">{errorTournament.gameId}</p>) : (<p className="errorForm"><br/></p>)}
                </div>

                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Start date</label>
                    <input
                    type="date"
                    name="startDate"
                    value={data.startDate}
                    onChange={handleChange}
                    required
                    className="inputFit"
                    min={new Date().toISOString().split("T")[0]}
                    />
                    {errorTournament.startDate ? (<p className="errorForm">{errorTournament.startDate}</p>) : (<p className="errorForm"><br/></p>)}
                </div>  
            </div>
            <div className="flex flex-col gap-2 w-fit">
                <button type="submit" className="buttonPrimary">Next</button>
            </div>
        </form>
    )
}
