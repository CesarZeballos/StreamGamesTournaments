import { AppDispatch, RootState } from "@/redux/store";
import { postTournamentSlice } from "@/redux/thunks/tournamentsSliceThunk";
import { reloadUserSlice } from "@/redux/thunks/userSliceThunk";
import { isoToDate } from "@/utils/formatDate";
import { useDispatch, useSelector } from "react-redux";


export const FinishStep: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { nameTournament, description, startDate, category, membersNumber, maxTeam, price, award } = useSelector((state: RootState) => state.organizer.tournament);
    const data = useSelector((state: RootState) => state.organizer.tournament)
    const { token, user } = useSelector((state: RootState) => state.user);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(token && user) {
            dispatch(postTournamentSlice({data: data, token: token}))
            dispatch(reloadUserSlice({email: user.email, tokenFirebase: user.tokenFirebase}))
        }
    }

    return (
        <form className="col-span-2 grid grid-cols-2" onSubmit={handleSubmit}>
            <h1 className="col-span-2 heading5 text-lightViolet">This is your tournament information</h1>
            <p className="body text-white">Name:</p>
            <p className="body text-white">{nameTournament}</p>
            <p className="body text-white">Description:</p>
            <p className="body text-white">{description}</p>
            <p className="body text-white">Start date:</p>
            <p className="body text-white">{isoToDate(startDate)}</p>
            <p className="body text-white">Category:</p>
            <p className="body text-white">{category}</p>
            <p className="body text-white">Members number:</p>
            <p className="body text-white">{membersNumber} members</p>
            <p className="body text-white">Max team:</p>
            <p className="body text-white">{maxTeam} teams</p>
            <p className="body text-white">Price:</p>
            <p className="body text-white">${price}</p>
            <p className="body text-white">Award:</p>
            <p className="body text-white">{award}</p>
            <button className="buttonPrimary" type="submit">Finish</button>
        </form>
    )    
}