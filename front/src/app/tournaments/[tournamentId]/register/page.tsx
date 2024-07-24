import { TournamentRegisterForm } from "@/components/tournamentRegisterForm";

const TournamentRegister = ({ params }: { params: { tournamentId: string } }) => {

    return (
        <div className="bodyContainer mb-16">
            <h1>Tournament {params.tournamentId}</h1>
            <TournamentRegisterForm />
        </div>
    );
}

export default TournamentRegister;