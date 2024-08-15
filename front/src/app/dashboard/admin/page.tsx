import UsersArea from "@/components/Areas/UsersArea";
import TournamentsArea from "@/components/Areas/TournamentsArea";
import GamesArea from "@/components/Areas/GamesArea";

const Dashboard: React.FC = () => {
    return (
        <div className="bodyContainer">
            <UsersArea/>
            <TournamentsArea/>
            <GamesArea/>
        </div>
    )
}

export default Dashboard