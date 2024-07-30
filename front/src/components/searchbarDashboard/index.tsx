import { setView } from "@/redux/slices/dashboardSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export const SearchBarDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const view = useSelector((state: RootState) => state.dashboard.view);

    const handleViewClick = (view: string) => {
        dispatch(setView(view))
    }
    
    return (
        <div className="bg-BGdark rounded-3xl p-4 mr-9 h-full">
            <button className="buttonSecondary" onClick={() => handleViewClick("data")}>Data</button>
            <button className="buttonSecondary" onClick={() => handleViewClick("teams")}>Teams</button>
            <button className="buttonSecondary" onClick={() => handleViewClick("createTeam")}>Create Team</button>
            <button className="buttonSecondary" onClick={() => handleViewClick("tournaments")}>Tournaments</button>
        </div>
    )
}
