import { TournamentRegisterForm } from "@/components/tournamentRegisterForm";

const TournamentRegister = ({ params }: { params: { tournamentId: string } }) => {

    return (
        <div className="bodyContainer">
            <h1>Tournament {params.tournamentId}</h1>
            <TournamentRegisterForm />
        </div>
    );
}

export default TournamentRegister;