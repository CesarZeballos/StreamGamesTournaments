import { ITeam } from "@/interfaces/interfaceUser"
import { setView } from "@/redux/slices/dashboardSlice";
import Link from "next/link"
import { useDispatch } from "react-redux";

export const TeamsDashboardView = ({teams} : {teams: ITeam[] | undefined}) => {
    const dispatch = useDispatch();
    
    const handleViewClick = (view: string) => {
        dispatch(setView(view))
    }

    return (
        <div>
            <h1 className="heading4 text-white">Your teams</h1>
            <div className="flex flex-col mt-4 gap-4">
            {teams === undefined || teams.length === 0 ? (<p className="body text-white mt-4">{"You don't have any team yet. Create one"}</p>
            ) : (
                teams.map((t) => (
                    <p className="body text-white" key={t.id}>{t.name}</p>
                )))}
            </div>
        </div>
    )
}