import { ISecondStep } from "@/interfaces/interfaceRedux";
import { ITournamentPostError } from "@/interfaces/interfaceTournaments";
import { setSecondStep } from "@/redux/slices/organizerSlice";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";


export const SecondStep: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<ISecondStep>({} as ISecondStep)
    const [errorTournament, setErrorTournament] = useState<ITournamentPostError>({} as ITournamentPostError);
    const [awards, setAwards] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target
        // const error = validateTournament(data)
        // if (error.membersNumber || error.maxTeam || error.price || error.award || error.description) {
        //   setErrorTournament(error)
        // } else {
        //   setErrorTournament({} as ITournamentPostError)
        // }
        setData(
        {
            ...data,
            [name]: value
        }
        )
    }

    const handleChangeAwards = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target
        const updateAwards = [...awards]
        updateAwards[index] = value
        setAwards(updateAwards)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (awards.length === 0) {
            toast.info("Your tournament has no awards", {
                position: 'top-right',
                duration: 1500,
                action: {
                    label: "ok",
                    onClick: () => {dispatch(setSecondStep(data))},
                }
            });    
        } else {
            setData({
                ...data,
                award: awards
            })
            dispatch(setSecondStep(data))
        }
    }

    return (
        <form onSubmit={handleSubmit} className="col-span-2">
            <div className="grid grid-cols-3 gap-6">

                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Number of members</label>
                    <input
                    type="number"
                    name="membersNumber"
                    value={data.membersNumber}
                    onChange={handleChange}
                    className="inputFit"
                    required
                    />
                    {errorTournament.membersNumber ? (<p className="errorForm">{errorTournament.membersNumber}</p>) : (<p className="errorForm"><br/></p>)}
                </div>

                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Maximum teams</label>
                    <input
                    type="number"
                    name="maxTeam"
                    value={data.maxTeam}
                    onChange={handleChange}
                    required
                    className="inputFit"
                    min={2}
                    />
                    {errorTournament.maxTeam ? (<p className="errorForm">{errorTournament.maxTeam}</p>) : (<p className="errorForm"><br/></p>)}
                </div>

                <div className="flex flex-col gap-2 w-fit">
                    <label className="body text-white">Price</label>
                    <input
                    type="string"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                    className="inputFit"
                    />
                    {errorTournament.price ? (<p className="errorForm">{errorTournament.price}</p>) : (<p className="errorForm"><br/></p>)}
                </div>
            </div>

            <div className="flex flex-col gap-2 w-fit">
                <label className="body text-white">Awards</label>
                <p className="errorForm">Awards are not a requirement but are valued by participants</p>
                <div className="grid grid-cols-3">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="body text-white">First position</label>
                        <input
                        type="text"
                        value={awards[0]}
                        onChange={event => handleChangeAwards(event, 0)}
                        className="input"
                        maxLength={100}/>
                        <label className="body text-white">Second position</label>
                        <input
                        type="text"
                        value={awards[1]}
                        onChange={event => handleChangeAwards(event, 1)}
                        className="input"
                        maxLength={100}/>
                        <label className="body text-white">Third position</label>
                        <input
                        type="text"
                        value={awards[2]}
                        onChange={event => handleChangeAwards(event, 2)}
                        className="input"
                        maxLength={100}/>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-fit">
                <label className="body text-white">Description</label>
                <textarea
                    value={data.description}
                    name="description"
                    onChange={handleChange}
                    required
                    className="inputMax"
                    placeholder="Enter a description of the tournament"
                    maxLength={500}
                />
                {errorTournament.description ? (<p className="errorForm">{errorTournament.description}</p>) : (<p className="errorForm"><br/></p>)}
            </div>

            <div className="flex flex-col gap-2 w-fit">
                <button type="submit" className="buttonPrimary">Next</button>
            </div>

        </form>
    )
}